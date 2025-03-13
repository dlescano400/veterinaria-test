import { DataSource } from "typeorm"
import path from "path"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, "entities/**/*.{ts,js}")],
    migrations: [path.join(__dirname, "migration/**/*.{ts,js}")],
    subscribers: [path.join(__dirname, "subscriber/**/*.{ts,js}")]
})