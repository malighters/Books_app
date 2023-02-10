import mongoose from "mongoose";

export class Book {
  constructor(public title: string, public author: string, public genre: string, public publicationYear: number, public id?: mongoose.ObjectId){}
}