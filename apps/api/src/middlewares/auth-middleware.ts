import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";

export interface AuthRequest extends Request {
  user?: any;
}

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async authenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.cookies?.accessToken;

      if (!accessToken) {
        res
          .status(401)
          .json({ message: "No autorizado (sin token en cookies)" });
        return;
      }

      const user = await this.authService.validateAccessToken(accessToken);

      if (!user) {
        res.status(401).json({ message: "Token inválido o expirado" });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error en middleware de auth:", error);
      res.status(401).json({ message: "No autorizado (error interno)" });
    }
  }
}
