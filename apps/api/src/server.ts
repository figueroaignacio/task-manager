import app from "./app";
import { config } from "./config/config";
import { initializeDatabase } from "./db/db";

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(config.server.port, () => {
      console.log(`Servidor corriendo en el puerto ${config.server.port}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
