const express = require('express');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const createError = require('http-errors');
require('dotenv').config();
require('express-async-errors');
require('colors');

// Import important dependencies
const { PORT, NODE_ENV } = process.env;
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Import site routes
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');

// Initiate Express App
const app = express();
const Port = PORT || 5000;

// Connect to database
connectDB();

// Use certain import middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(helmet());
app.use(compression());

// Site routes
app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/categories', categoryRoute);
app.use('/', (req, res, next) => res.redirect('/posts'));

// Catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// Error handler
app.use(errorHandler);

app.listen(Port, () => console.log(`Server running on Port: ${Port}`.cyan.underline));
