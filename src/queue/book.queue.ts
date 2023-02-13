import { Queue, Worker, type Job, } from 'bullmq';
import { Book, } from '../models/book.js';

const bookQueue = new Queue('Book',);

const bookWorker = new Worker(bookQueue.name, async (job: Job,) => {
  const data = job.data;

  const book = new Book({
    title: data.title,
    author: data.title,
    genre: data.title,
    publicationYear: data.publicationYear,
  },);

  const savedBook = book.save();
},);

export const postBook = (data: any,) => {
  bookQueue.add('post', data, { removeOnComplete: true, removeOnFail: true, },);
};
