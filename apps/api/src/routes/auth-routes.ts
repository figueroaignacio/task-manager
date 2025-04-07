import { Router } from "express";
import { AuthController } from "../controllers/user-controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

export class AuthRoutes {
  private router: Router;
  private authController: AuthController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      "/register",
      this.authController.register.bind(this.authController)
    );
    this.router.post(
      "/login",
      this.authController.login.bind(this.authController)
    );
    this.router.post(
      "/refresh",
      this.authController.refresh.bind(this.authController)
    );
    this.router.post(
      "/logout",
      this.authController.logout.bind(this.authController)
    );

    this.router.get(
      "/me",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authController.me.bind(this.authController)
    );

    this.router.post(
      "/logout-all",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.authController.logoutAll.bind(this.authController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
