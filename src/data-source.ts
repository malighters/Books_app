import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./utils/config.js";
import { Book } from "./entity/Book.js";
import { User } from "./entity/User.js";
import { Book1678198313268 } from "./migrations/1678198313268-Book.js";

export const AppDataSource = new DataSource({
  "type": "mongodb",
  "url": config.MONGODB_URI,
  "useNewUrlParser": true,
  "logging": true,
  "ssl": true,
  "authSource": "admin",
  "database": "books",
  "entities": [Book, User],
  "migrations": [Book1678198313268],
  "subscribers": [],
});