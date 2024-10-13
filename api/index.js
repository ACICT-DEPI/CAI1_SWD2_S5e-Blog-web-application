import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
dotenv.config();

//for MongoDB Atlas
//const uri = 'mongodb+srv://abdo17nasr:pass123@cluster0.gdvku.mongodb.net/Blog?retryWrites=true&w=majority';
const uri = process.env.MONGO;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(express.json());
app.use(cookieParser());

// Get the directory name from the current module URL
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
