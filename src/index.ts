import express, { type Request, type Response, type NextFunction, } from 'express';
import mongoose from 'mongoose';
import { booksRouter, } from './routes/books.router.js';
import config from './utils/config.js';

const app = express();

app.use(express.json(),);

app.use((err: Error, req: Request, res: Response, next: NextFunction,) => {
  res.status(500,).json({ message: err.message, },);
},);

if(!config.MONGODB_URI || !config.PORT){
    console.warn('Problem with environment variables');
}
else{
    mongoose.connect(config.MONGODB_URI)
  .then(() => {
    app.use('/api/books', booksRouter,);

    app.listen(process.env.PORT, () => {
      console.log(`Server started at http://localhost:${config.PORT}`,);
    },);
  },)
  .catch((error: Error,) => {
    console.error('Database connection failed', error,);
    process.exit();
  },);
}


app.get('/', (req, res,) => {
  res.send('hello world',);
},);
