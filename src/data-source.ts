import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./utils/config.js";
import { Book } from "./entity/Book.js";
import { User } from "./entity/User.js";

export const AppDataSource = new DataSource({
  "type": "mongodb",
  "url": config.MONGODB_URI,
  "useNewUrlParser": true,
  "synchronize": true,
  "logging": true,
  "ssl": true,
  "authSource": "admin",
  "database": "books",
  "entities": [Book, User],
  "migrations": [],
  "subscribers": [],
});