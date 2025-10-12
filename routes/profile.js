// routes/profile.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// GET /api/profile - fetch user profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const r = await pool.query(
      'SELECT id, name, email, trees_planted, points FROM users WHERE id = $1',
      [req.user.id]
    );
    if (r.rowCount === 0) return res.status(404).json({ message: 'User not found' });
    return res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/profile/trees - add trees
router.post('/trees', verifyToken, async (req, res) => {
  const treesToAdd = Number(req.body.trees);

  if (!req.body.trees || !Number.isInteger(treesToAdd) || treesToAdd <= 0) {
    return res.status(400).json({ message: 'trees must be a positive integer' });
  }

  try {
    const sql = `
      UPDATE users
      SET trees_planted = trees_planted + $1,
          points = CAST(FLOOR((trees_planted + $1) / 10.0) AS INT)
      WHERE id = $2
      RETURNING id, name, email, trees_planted, points;
    `;
    const r = await pool.query(sql, [treesToAdd, req.user.id]);
    if (r.rowCount === 0) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: 'Updated successfully', user: r.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
