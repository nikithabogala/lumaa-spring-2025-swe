// backend/src/controllers/task.controller.ts
import { RequestHandler } from 'express';
import { pool } from '../db';

export const getTasks: RequestHandler = async (req, res, next) => {
  const userId = (req as any).user.id;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  const userId = (req as any).user.id;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create task' });
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, "isComplete" = $3 WHERE id = $4 AND "userId" = $5 RETURNING *',
      [title, description, isComplete, id, userId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update task' });
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1 AND "userId" = $2', [id, userId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete task' });
  }
};
