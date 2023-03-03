import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from 'cookie-parser';
import express, { type Request, type Response, type NextFunction, } from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import passport from "passport";
import passportLocal from 'passport-local';

import { booksRouter, } from './routes/books.router.js';
import config from './utils/config.js';
import { loginRouter } from "./routes/login.router.js";
import { User, IUser, IDataBaseUser } from "./models/user.js";

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

passport.use(new LocalStrategy((username: string, password: string, done) => {
  User.findOne({ username: username }, (err: Error, user: IDataBaseUser) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.passwordHash, (err, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
})
);

passport.serializeUser((user: IDataBaseUser, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: IDataBaseUser) => {
    const userInformation: IUser = {
      username: user.username,
      name: user.name,
      email: user.email,
      id: user._id
    };
    cb(err, userInformation);
  });
});

if(!config.MONGODB_URI){
    console.warn('Problem with environment variables');
}
else{
  mongoose.connect(config.MONGODB_URI)
    .then(() => {
      app.use('/api/books', booksRouter,);
      app.use('/', loginRouter,);

      app.listen(process.env.PORT, () => {
        console.log(`Server started at http://localhost:${config.PORT}`,);
      },);
    },)
    .catch((error: Error,) => {
      console.error('Database connection failed', error,);
      process.exit();
    },);
}


app.get('/', (_req, res,) => {
  res.send('hello world!',);
},);
