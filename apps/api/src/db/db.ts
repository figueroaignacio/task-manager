import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config/config";
// import { User } from '../entities/user.entity';
// import { RefreshToken } from '../entities/refresh-token.entity';

export const AppDataSource = new DataSource({
  type: config.db.type as any,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.db.synchronize,
  logging: config.db.logging,
  entities: [],
});

export const initializeDatabase = async (): Promise<DataSource> => {
  try {
    const dataSource = await AppDataSource.initialize();
    console.log("Base de datos conectada exitosamente");
    return dataSource;
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
};
