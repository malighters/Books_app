import { Worker, type Job, } from 'bullmq';
import { Book, } from '../models/book.js';
import { bookQueue, } from '../queue/book.queue.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bookWorker = new Worker(bookQueue.name, async (job: Job,) => {
  const data = job.data;

  const book = new Book({
    title: data.title,
    author: data.title,
    genre: data.title,
    publicationYear: data.publicationYear,
  },);

  await book.save();
},);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const postBook = async (data: any,) => {
  await bookQueue.add('post', data, { removeOnComplete: true, removeOnFail: true, },);
};
