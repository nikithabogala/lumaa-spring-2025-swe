// backend/src/routes/task.routes.ts
import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Protect all routes using the middleware
router.use(authenticateToken);

// GET /tasks
router.get('/', getTasks);
// POST /tasks
router.post('/', createTask);
// PUT /tasks/:id
router.put('/:id', updateTask);
// DELETE /tasks/:id
router.delete('/:id', deleteTask);

export default router;
