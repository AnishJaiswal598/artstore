import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import './config/passport-setup.js';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import connectDB from './config/db.js';

import artworkRoute from './routes/artworks.js';
import ordersRoute from './routes/orders.js';
import usersRoute from './routes/Users.js';

dotenv.config();
await connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.TOKEN_SECRET],
  })
);
app.use(cookieParser());
app.use(passport.initialize());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My Artstore ApI',
      description: 'My Arts Collection',
      contact: {
        name: 'Amazing developers',
      },
      servers: ['http://localhost:3001'],
    },
  },
  apis: ['server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /register:
 * post:
 *  description: Used to register as an User
 */

/**
 * @swagger
 * /:
 * get:
 *  description: running
 */

app.use(morgan(':method :url :status :response-time ms'));

app.use('/api/artstore/artworks', artworkRoute);
app.use('/api/artstore/orders', ordersRoute);
app.use('/api/artstore/users', usersRoute);

app.get('/', (req, res) => {
  res.send('Running');
});
app.get('/1', (req, res) => {
  res.send('Running failed');
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
// "eslint": "^6.8.0",
// "eslint-config-airbnb": "^18.2.1",
// "eslint-config-node": "^4.1.0",
// "eslint-config-prettier": "^8.3.0",
// "eslint-plugin-import": "^2.22.1",
// "eslint-plugin-jsx-a11y": "^6.4.1",
// "eslint-plugin-node": "^11.1.0",
// "eslint-plugin-prettier": "^4.0.0",
// "eslint-plugin-react": "^7.21.5",
// "eslint-plugin-react-hooks": "^1.7.0",
