import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  thumbnailUrl: String,
  videoUrl: String,
  description: String,
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
});

export default mongoose.model('Video', videoSchema);