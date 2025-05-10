import Video from '../models/Video.js'; // Make sure Video is imported correctly
import Channel from '../models/Channel.js';

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      channelId,
    } = req.body;

    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      channelId,
      uploader: req.user.id, // from auth middleware
      uploadDate: new Date(),
      views: 0,
      likes: 0,
      dislikes: 0
    });

    await video.save();

    // Push video ID to the corresponding channel
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: video._id },
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};