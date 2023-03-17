import { Worker, type Job, } from 'bullmq';
import { Book } from '../entity/Book.js';
import { bookQueue, } from '../queue/book.queue.js';
import { PostgresDataSource } from '../data-source.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bookWorker = new Worker(bookQueue.name, async (job: Job,) => {
  const data = job.data;
  const book = new Book();
  book.title = data.title;
  book.author = data.title;
  book.genre = data.title;
  book.publicationYear = data.publicationYear;
  const bookRepository = PostgresDataSource.getRepository(Book);
  await bookRepository.save(book);
},
{
  connection: {
      host: "localhost",
      port: 6379
  }
},);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const postBook = async (data: any,) => {
  await bookQueue.add('post', data, { removeOnComplete: true, removeOnFail: true, },);
};
