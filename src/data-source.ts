import "reflect-metadata";
import path from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from "typeorm";

import config from "./utils/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { User } from "./entity/User.js";
import { Author } from "./entity/Author.js";
import { Book } from "./entity/Book.js";

const MongoDataSource = new DataSource({
  type: "mongodb",
  url: config.MONGODB_URI,
  useNewUrlParser: true,
  logging: true,
  database: 'books',
  ssl: false,
  entities: [ `${__dirname}/entity/*.ts`],
  migrations: [ `${__dirname}/migrations/*.ts` ],
  subscribers: [],
  synchronize: true
});

const PostgresDataSource = new DataSource({
  type: 'postgres',
  url: config.POSTGRES_URI,
  logging: true,
  ssl: false,
  database: 'books',
  entities: [User, Author, Book],
  migrations: [ `${__dirname}/migrations/*.js` ],
  subscribers: [],
});

export { PostgresDataSource };
