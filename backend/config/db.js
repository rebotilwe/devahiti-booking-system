import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool (not promise pool to use callbacks)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'devahiti_booking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool for callback-based queries
export default pool;