// External Dependencies
import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { collections } from '../services/database.service.js';
import { Book } from '../models/book.js';
// Global Config
export const booksRouter = express.Router();
booksRouter.use(express.json())
// GET
booksRouter.get('/', async (_req: Request, res: Response) => {
    try{
        const books = (await collections.books?.find({}).toArray()) as unknown as Book[];

        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

booksRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try{
        
        const book = (await collections.books!.findOne({ _id: new Types.ObjectId(id) })) as unknown as Book;

        if(book){
            res.status(200).send(book)
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }

});
// POST
booksRouter.post('/');
// PUT
booksRouter.put('/');
// DELETE
booksRouter.delete('/');
