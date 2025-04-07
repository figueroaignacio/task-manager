import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/config";

type JwtConfig = {
  secret: jwt.Secret;
  expiresIn: string | number;
};

interface TokenPayload extends jwt.JwtPayload {
  userId: string;
}

export class JwtUtil {
  private static getJwtConfig(type: "access" | "refresh"): JwtConfig {
    return {
      secret:
        type === "access" ? config.jwt.accessSecret : config.jwt.refreshSecret,
      expiresIn:
        type === "access"
          ? config.jwt.accessExpiresIn
          : config.jwt.refreshExpiresIn,
    };
  }

  static generateAccessToken(userId: string): string {
    const { secret, expiresIn } = this.getJwtConfig("access");
    return jwt.sign({ userId }, secret, { expiresIn } as SignOptions);
  }

  static generateRefreshToken(userId: string): string {
    const { secret, expiresIn } = this.getJwtConfig("refresh");
    return jwt.sign({ userId }, secret, { expiresIn } as SignOptions);
  }

  static verifyAccessToken(token: string): TokenPayload | null {
    try {
      const { secret } = this.getJwtConfig("access");
      return jwt.verify(token, secret) as TokenPayload;
    } catch {
      return null;
    }
  }

  static verifyRefreshToken(token: string): TokenPayload | null {
    try {
      const { secret } = this.getJwtConfig("refresh");
      return jwt.verify(token, secret) as TokenPayload;
    } catch {
      return null;
    }
  }
}
