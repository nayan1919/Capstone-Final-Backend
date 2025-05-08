import express from 'express';
import Video from '../models/Video.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const videos = await Video.find().limit(50).sort({ uploadDate: -1 }).populate('uploader');
  res.send(videos);
});

router.post('/', authenticate, async (req, res) => {
  const video = new Video(req.body);
  await video.save();
  res.status(201).send(video);
});

router.put('/:id', authenticate, async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(video);
});

router.delete('/:id', authenticate, async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
