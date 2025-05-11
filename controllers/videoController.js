// Importing the Video and Channel models to interact with their respective collections in MongoDB
import Video from '../models/Video.js';
import Channel from '../models/Channel.js';

// Controller function to get all videos, limited to 50, sorted by upload date in descending order
export const getVideos = async (req, res) => {
  try {
    // Fetching videos with a limit of 50 and sorted by uploadDate in descending order
    const videos = await Video.find()
      .limit(50) // Limits the number of videos to 50
      .sort({ uploadDate: -1 }) // Sorts by uploadDate in descending order
      .populate('uploader', 'username'); // Populates the 'uploader' field with 'username' only from the User model
    // Sending a successful response with the list of videos
    res.status(200).json(videos);
  } catch (err) {
    // If an error occurs, sending a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// Controller function to get a specific video by its ID
export const getVideoById = async (req, res) => {
  try {
    // Fetching a video by its ID and populating the 'uploader' field with 'username' only
    const video = await Video.findById(req.params.id)
      .populate('uploader', 'username'); // Populating 'uploader' with 'username' from the User model
    // If the video is not found, return a 404 error
    if (!video) return res.status(404).json({ error: 'Video not found' });
    // Sending a successful response with the video details
    res.status(200).json(video);
  } catch (err) {
    // If an error occurs, sending a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// Controller function to upload a new video
export const uploadVideo = async (req, res) => {
  try {
    // Destructuring the video details from the request body
    const { title, description, videoUrl, thumbnailUrl, channelId } = req.body;

    // Creating a new Video instance with the provided data
    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      channelId,
      uploader: req.user.id, // Ensuring the uploader's ID comes from the authenticated user (via auth middleware)
      uploadDate: new Date(), // Setting the upload date to the current date
      views: 0, // Initial views set to 0
      likes: 0, // Initial likes set to 0
      dislikes: 0 // Initial dislikes set to 0
    });

    // Saving the video to the database
    await video.save();

    // Updating the corresponding Channel document to add the new video to its videos array
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: video._id }, // Pushing the new video's ID to the channel's videos array
    });

    // Sending a successful response with the uploaded video details
    res.status(201).json(video);
  } catch (err) {
    // If an error occurs, sending a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};
