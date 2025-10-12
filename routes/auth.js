// routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';
const SALT_ROUNDS = 10;

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' });

    const normalizedEmail = email.trim().toLowerCase();

    const exists = await pool.query('SELECT 1 FROM users WHERE email = $1', [normalizedEmail]);
    if (exists.rowCount > 0) return res.status(409).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const insert = `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, trees_planted, points`;
    const r = await pool.query(insert, [name.trim(), normalizedEmail, hash]);
    const user = r.rows[0];

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({ message: 'Account created', token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/signin
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    const normalizedEmail = email.trim().toLowerCase();
    const q = 'SELECT id, name, email, password_hash FROM users WHERE email = $1';
    const r = await pool.query(q, [normalizedEmail]);
    if (r.rowCount === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = r.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
