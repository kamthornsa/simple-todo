import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433'),
  database: process.env.DB_NAME || 'simple-todo',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '55555.',
});

export default pool;
