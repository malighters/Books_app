import mongoose from "mongoose";

export interface IUser {
    username: string
    name: string
    email: string
    id: string
}

export interface IDataBaseUser {
    username: string
    name: string
    email: string
    passwordHash: string
    _id: string
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
      },
    name: String,
    email: String,
    passwordHash: String
})

export const User = mongoose.model('User', UserSchema)