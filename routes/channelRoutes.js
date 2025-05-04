import express from 'express';
import Channel from '../models/Channel.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const channel = new Channel(req.body);
  await channel.save();
  res.status(201).send(channel);
});

router.get('/:id', async (req, res) => {
  const channel = await Channel.findById(req.params.id).populate('videos');
  res.send(channel);
});

export default router;