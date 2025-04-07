import { Repository } from "typeorm";
import { AppDataSource } from "../db/db";
import { RefreshToken } from "../entities/refresh-token-entity";
import { User } from "../entities/user-entity";
import { JwtUtil } from "../utils/jwt-util";
import { UserService } from "./user-service";

export class AuthService {
  private refreshTokenRepository: Repository<RefreshToken>;
  private userService: UserService;

  constructor() {
    this.refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
    this.userService = new UserService();
  }

  async register(userData: { email: string; password: string }): Promise<User> {
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    return this.userService.create(userData);
  }

  async login(
    credentials: { email: string; password: string },
    userAgent?: string,
    ipAddress?: string
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.userService.findByEmail(credentials.email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isPasswordValid = await this.userService.validatePassword(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    const accessToken = JwtUtil.generateAccessToken(user.id);
    const refreshToken = JwtUtil.generateRefreshToken(user.id);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const newRefreshToken = this.refreshTokenRepository.create({
      user,
      userId: user.id,
      token: refreshToken,
      expiresAt,
      userAgent,
      ipAddress,
    });

    await this.refreshTokenRepository.save(newRefreshToken);

    return {
      accessToken,
      user,
    };
  }

  async refresh(
    refreshToken: string
  ): Promise<{ accessToken: string; user: User } | null> {
    const tokenDoc = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken, isRevoked: false },
      relations: ["user"],
    });

    if (!tokenDoc || new Date() > tokenDoc.expiresAt) {
      return null;
    }

    const payload = JwtUtil.verifyRefreshToken(refreshToken);
    if (!payload) {
      return null;
    }

    const user = tokenDoc.user;
    const accessToken = JwtUtil.generateAccessToken(user.id);

    return {
      accessToken,
      user,
    };
  }

  async logout(refreshToken: string): Promise<boolean> {
    const result = await this.refreshTokenRepository.update(
      { token: refreshToken },
      { isRevoked: true }
    );

    return (result.affected ?? 0) > 0;
  }

  async logoutAll(userId: string): Promise<boolean> {
    const result = await this.refreshTokenRepository.update(
      { userId, isRevoked: false },
      { isRevoked: true }
    );

    return (result.affected ?? 0) > 0;
  }

  async getRefreshTokenByUserId(userId: string): Promise<RefreshToken | null> {
    return this.refreshTokenRepository.findOne({
      where: {
        userId: userId,
        isRevoked: false,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  async validateAccessToken(token: string): Promise<User | null> {
    const payload = JwtUtil.verifyAccessToken(token);
    if (!payload || !payload.userId) {
      return null;
    }

    return this.userService.findById(payload.userId);
  }
}
