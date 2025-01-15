/* eslint-disable @typescript-eslint/no-require-imports */
import { Sequelize } from "sequelize";
import config from "../config";

const dbConnection = new Sequelize({
  host: config.DATABASE_HOST,
  username: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
  timezone: "+03:00", // Türkiye saati (UTC+3)
});

//db.sync({ alter: true });
dbConnection.authenticate();

export const db = dbConnection;
