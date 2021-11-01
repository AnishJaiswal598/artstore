import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import artworkRoute from './routes/artworks.js';
import ordersRoute from './routes/orders.js';
import usersRoute from './routes/Users.js';

dotenv.config();
await connectDB();
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

export default app;
