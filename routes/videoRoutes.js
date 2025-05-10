import express from 'express';
import Video from '../models/Video.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { uploadVideo } from '../controllers/videoController.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().limit(50).sort({ uploadDate: -1 }).populate('uploader');
    res.send(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post('/upload', authenticate, uploadVideo);

router.put('/:id', authenticate, async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(video);
});

router.delete('/:id', authenticate, async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
