import express from 'express';
import dotenv from 'dotenv';
import JobsRoutes from './routes/JobsRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/jobs', JobsRoutes);

// Default route for health check or root
app.get('/', (req, res) => {
  res.send('Welcome to the NxtJob API!');
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
