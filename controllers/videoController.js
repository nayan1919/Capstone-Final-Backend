import Comment from '../models/Video.js';

export const getVideos = async (req,res) => {
    try {
       const videos = await Video.find();
       res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({error: err.message});
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
}