import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { AuthRequest } from "../middlewares/auth-middleware";
import { AuthService } from "../services/auth-service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email y password son requeridos" });
        return;
      }

      const user = await this.authService.register({ email, password });

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error en registro:", error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email y password son requeridos" });
        return;
      }

      const userAgent = req.headers["user-agent"];
      const ipAddress = req.ip;

      const { accessToken, user } = await this.authService.login(
        { email, password },
        userAgent,
        ipAddress
      );

      const refreshToken = await this.authService.getRefreshTokenByUserId(
        user.id
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 15,
      });

      if (refreshToken) {
        res.cookie("refreshToken", refreshToken.token, {
          ...config.cookie,
          expires: refreshToken.expiresAt,
        });
      }

      res.json({
        message: "Login exitoso",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error en login:", error);
      const status =
        error instanceof Error && error.message === "Credenciales inválidas"
          ? 401
          : 500;
      res.status(status).json({
        message: error instanceof Error ? error.message : "Error en el login",
      });
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({ message: "Refresh token no proporcionado" });
        return;
      }

      const result = await this.authService.refresh(refreshToken);

      if (!result) {
        res.clearCookie("refreshToken");
        res.status(401).json({ message: "Refresh token inválido o expirado" });
        return;
      }

      const { accessToken, user } = result;
      res.json({ accessToken, user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error("Error en refresh token:", error);
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        await this.authService.logout(refreshToken);
      }

      res.clearCookie("refreshToken");
      res.json({ message: "Logout exitoso" });
    } catch (error) {
      console.error("Error en logout:", error);
      next(error);
    }
  }

  async logoutAll(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      await this.authService.logoutAll(userId);
      res.clearCookie("refreshToken");
      res.json({ message: "Todas las sesiones cerradas exitosamente" });
    } catch (error) {
      console.error("Error en logoutAll:", error);
      next(error);
    }
  }

  async me(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      res.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error("Error en me:", error);
      next(error);
    }
  }
}
