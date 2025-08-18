import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();

/**
 * Supabase connection priority:
 * 1. DATABASE_URL (if set directly)
 * 2. POSTGRES_PRISMA_URL (pooled, best for serverless)
 * 3. POSTGRES_URL (pooled fallback)
 * 4. POSTGRES_URL_NON_POOLING (avoid unless needed)
 * 5. Manual construction from pieces
 */
const {
  DATABASE_URL,
  POSTGRES_PRISMA_URL,
  POSTGRES_URL,
  POSTGRES_URL_NON_POOLING,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  DB_LOGGING,
  NODE_ENV
} = process.env;

// Priority order for database URL
const dbUrl = DATABASE_URL || 
              POSTGRES_PRISMA_URL || 
              POSTGRES_URL || 
              POSTGRES_URL_NON_POOLING;

let sequelize: Sequelize;

if (dbUrl) {
  sequelize = new Sequelize(dbUrl, {
    dialect: "postgres",
    models: [User],
    logging: DB_LOGGING === "true" && NODE_ENV !== "production",
    dialectOptions: {
      ssl: dbUrl.includes("sslmode=require") ? { require: true, rejectUnauthorized: false } : undefined
    }
  });
} else {
  // Fallback to manual construction from individual env vars
  sequelize = new Sequelize({
    database: POSTGRES_DATABASE || "postgres",
    username: POSTGRES_USER || "postgres",
    password: POSTGRES_PASSWORD || "",
    host: POSTGRES_HOST || "127.0.0.1",
    port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10) : 5432,
    dialect: "postgres",
    models: [User],
    logging: DB_LOGGING === "true" && NODE_ENV !== "production",
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  });
}

export { sequelize };