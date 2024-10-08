import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
//const uri = 'mongodb://localhost:27017/mydatabase'; //local MongoDB
//for MongoDB Atlas
//const uri = 'mongodb+srv://abdo17nasr:pass123@cluster0.gdvku.mongodb.net/?retryWrites=true&w=majority';
const uri = process.env.MONGO;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.listen(3001, () => {
    console.log('Server is running on port 3001!');
});