import express from 'express';
import db from './config/connection.js';
import routes from './routes/api/index.js'; // or './routes' if you're using a top-level routes/index.ts

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to handle form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount all API routes under /api
app.use('/api', routes);

// Start the server after DB connects
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Social Network API running on port ${PORT}`);
  });
});
