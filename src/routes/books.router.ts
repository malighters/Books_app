/* eslint-disable @typescript-eslint/no-misused-promises */
// External Dependencies
import express, { type Request, type Response, } from 'express';
import { postBook, } from '../worker/book.worker.js';
import { Book, } from '../models/book.js';
// Global Config
export const booksRouter = express.Router();
booksRouter.use(express.json(),);
// GET
booksRouter.get('/', async (_req: Request, res: Response,) => {
  try {
    const books = await Book.find({},);

    res.json(books,);
  } catch (error) {
    res.status(500,).send(error.message,);
  }
},);

booksRouter.get('/:id', async (req: Request, res: Response,) => {
  const id = req?.params?.id;

  try {
    const book = await Book.findById(id,);

    if (book != null) {
      res.json(book,);
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    res.status(404,).send(`Unable to find matching document with id: ${req.params.id}`,);
  }
},);
// POST
booksRouter.post('/', async (req: Request, res: Response,) => {
  await postBook(req.body,);

  res.status(201,).send('Book has been added to the queue and will be sent to the server',);
},);
// PUT
booksRouter.put('/',);
// DELETE
booksRouter.delete('/',);
