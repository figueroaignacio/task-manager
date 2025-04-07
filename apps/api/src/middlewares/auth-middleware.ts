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
      // Extracting token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const accessToken = authHeader.split(" ")[1];
      const user = await this.authService.validateAccessToken(accessToken);

      if (!user) {
        res.status(401).json({ message: "Token inválido o expirado" });
        return;
      }

      // Add user to request for later use
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }
  }
}
