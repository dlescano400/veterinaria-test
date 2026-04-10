import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "veterinaria.db",
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "entities/**/*.{ts,js}")],
});
