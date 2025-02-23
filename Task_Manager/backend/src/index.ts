// backend/src/index.ts
import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';



const app = express();


// Enable CORS for all origins. You can also restrict origins if needed.
app.use(cors({ origin: '*' }));
// Optionally, to handle preflight OPTIONS requests explicitly:
app.options('*', cors());

app.use(bodyParser.json());

// Define your routes after applying CORS
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Management Backend is running.');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
