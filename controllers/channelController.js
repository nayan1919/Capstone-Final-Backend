import Channel from '../models/Channel.js';

export const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json(channels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createChannel = async (req, res) => {
  try {
    const channel = new Channel(req.body);
    await channel.save();
    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
