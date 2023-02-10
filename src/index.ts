import express, {Request, Response, NextFunction} from 'express'
import mongoose from 'mongoose'
import { connectToDatabase } from './services/database.service.js';
import { booksRouter } from './routes/books.router.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());

app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

connectToDatabase()
    .then(() => {
        app.use('/api/books', booksRouter);

        app.listen(process.env.PORT, () => {
            console.log(`Server started at http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });




app.get('/', (req, res) => {
    res.send('hello world')
})
