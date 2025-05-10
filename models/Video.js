import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  thumbnailUrl: String,
  videoUrl: String,
  description: String,
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // if not already added
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
});

const Video = mongoose.model('Video', videoSchema);
export default Video; // ✅ This fixes the error
