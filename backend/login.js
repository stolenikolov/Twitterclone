import express from 'express';
import { User } from './db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (!user) return res.status(401).json({ message: 'Invalid username or password' });
  res.json({ user: user.get() });
});

export default router;
