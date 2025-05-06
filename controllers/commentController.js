import Comment from '../models/Comment.js';

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
