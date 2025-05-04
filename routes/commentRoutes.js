import express from 'express';
import Comment from '../models/Comment.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.status(201).send(comment);
});

router.get('/:videoId', async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.send(comments);
});

export default router;
