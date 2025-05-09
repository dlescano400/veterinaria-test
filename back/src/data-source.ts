import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres", // el nombre del servicio de Docker
  port: 5432,
  username: "admin",
  password: "admin",
  database: "veterinaria",
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, "entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "migration/**/*.{ts,js}")],
  subscribers: [path.join(__dirname, "subscriber/**/*.{ts,js}")],
});
