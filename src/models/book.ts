import mongoose from 'mongoose';

interface IBook {
  title: string
  authotr: string
  genre: string
  publicationYear: number
}

const BookSchema = new mongoose.Schema<IBook>({
  title: String,
  authotr: String,
  genre: String,
  publicationYear: Number,
},);

export const Book = mongoose.model<IBook>('Book', BookSchema,);
