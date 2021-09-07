require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const artworkRoute = require('./routes/artworks');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/Users');

connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms'));

app.use('/api/artstore/artworks', artworkRoute);
app.use('/api/artstore/orders', ordersRoute);
app.use('/api/artstore/users', usersRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
