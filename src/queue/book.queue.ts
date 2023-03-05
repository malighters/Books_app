import { Queue, } from 'bullmq';

export const bookQueue = new Queue('Book', {
    connection: {
        host: "localhost",
        port: 6379
    }
},);
