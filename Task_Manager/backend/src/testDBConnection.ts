// backend/src/testDBConnection.ts
import dotenv from 'dotenv';
dotenv.config();  // This loads variables from .env

import { pool } from './db';

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully!');
    console.log('Current time:', result.rows[0].now);
  } catch (err) {
    console.error('Database connection failed:', err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testConnection();
