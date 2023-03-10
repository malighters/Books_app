import "reflect-metadata"; 
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from 'cookie-parser';
import express, { type Request, type Response, type NextFunction, } from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import passport from "passport";
import passportLocal from 'passport-local';

import { AppDataSource } from "./data-source.js";
import { booksRouter, } from './routes/books.router.js';
import config from './utils/config.js';
import { loginRouter } from "./routes/login.router.js";
import { User } from "./entity/User.js";


const LocalStrategy = passportLocal.Strategy;

// Middleware
const app = express();
app.use(express.json(),);

app.use((err: Error, _req: Request, res: Response, next: NextFunction,) => {
  res.status(500,).json({ message: err.message, },);
},);

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Passport 

passport.use(new LocalStrategy( async (username: string, password: string, done) => {
  const userRepository = AppDataSource.getMongoRepository(User);
  const user = await userRepository.findOneBy({username: username});
  if(user){
    bcrypt.compare(password, user.passwordHash, (err, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }
})
);

passport.serializeUser((user: User, cb) => {
  cb(null, user.id);
});

passport.deserializeUser( async (id: string, cb) => {
  try{
    const userRepository = AppDataSource.getMongoRepository(User);
    const user = await userRepository.findOneById(id);
    
    if(user){
      cb(null, user);
    }
  }
  catch(error){
    console.error(error);
  }
  
});

const main = async () => {
  if(!config.MONGODB_URI){
    console.warn('Problem with environment variables');
}
  else{
    try{
      await AppDataSource.initialize();
      app.use('/api/books', booksRouter,);
      app.use('/', loginRouter,);

      app.listen(process.env.PORT, () => {
      console.log(`Server started at http://localhost:${config.PORT}`,);
      },);
      
      
    }
    catch(error){
      console.error(error);
		  throw new Error('Unable to connect to db');
    };
}
}

main();

app.get('/', (_req, res,) => {
  res.send('hello world!',);
},);
