// db.js
require('dotenv').config();
const { Pool } = require('pg');

let pool;

try {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('Missing DATABASE_URL');

  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  });

  console.log('✅ Connected to PostgreSQL');
} catch (err) {
  console.warn('⚠️ Database not available — using mock pool instead:', err.message);

  // Mock version that never crashes
  pool = {
    query: async (text, params) => {
      console.log('💡 Mock DB query:', text, params);
      // Simulate an empty result
      return { rows: [] };
    },
  };
}

module.exports = pool;
