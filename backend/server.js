require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Import routers
const  bookRouter = require('./routers/bookRouter');
const userRouter  = require('./routers/userRouter');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using environment variable
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


/* // connect to mongoDB
try {
  mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB");
} catch (error) {
  console.log("Error: ", error);
} */


// Use routers
app.use('/user', userRouter);
app.use('/book', bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;




/* If You Prefer ES Modules (import/export):
Make sure you have "type": "module" in your package.json to enable ES module support */

/* import 'dotenv/config';  // Load environment variables from .env file
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { bookRouter, userRouter } from './routers.js';  // Ensure the file extension

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using environment variable
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Use routers
app.use('/user', userRouter);
app.use('/book', bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; */
