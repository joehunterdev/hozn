import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/User"; // adjust if path differs

dotenv.config();

/*
  Supabase / Hosted Postgres Configuration Strategy:
  1. Prefer a single DATABASE_URL env var (Supabase gives this).
     Example: postgresql://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require
  2. Fallback to discrete DB_* vars if DATABASE_URL not provided.
  3. Enforce SSL for Supabase (require + rejectUnauthorized: false).
*/

const {
  DATABASE_URL,
  DB_HOST,
  DB_PORT = "5432",
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_SSL = "true",
  DB_LOGGING = "false",
} = process.env;

const useLogging = DB_LOGGING === "true" ? console.log : false;

let sequelize: Sequelize;

if (DATABASE_URL) {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    models: [User],
    logging: useLogging,
    dialectOptions: DB_SSL === "true" ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  });
} else {
  if (!DB_HOST || !DB_NAME || !DB_USER) {
    throw new Error("Database configuration incomplete. Set DATABASE_URL or DB_HOST/DB_NAME/DB_USER vars.");
  }
  sequelize = new Sequelize({
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: "postgres",
    models: [User],
    logging: useLogging,
    dialectOptions: DB_SSL === "true" ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  });
}

export { sequelize };
