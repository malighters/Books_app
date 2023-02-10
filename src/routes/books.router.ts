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
        const books = (await collections.books?.find({})) as unknown as Book[];

        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

booksRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try{
        const query = { _id: new Types.ObjectId(id)};
        const book = (await collections.books?.find({ query })) as unknown as Book;

        if(book){
            res.status(200).send(book)
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }

});
// POST
booksRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newBook = req.body as Book;
        const result = await collections.books?.insertOne(newBook);

        result 
            ? res.status(201).send(`Successfully created a new book with id ${result.insertedId}`)
            : res.status(500).send('Failed to create a new book')
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message)
    }
});
// PUT
booksRouter.put('/');
// DELETE
booksRouter.delete('/');
