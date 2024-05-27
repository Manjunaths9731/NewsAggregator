import express from 'express';
import configs from '../config/config.js';
import healthModel from '../models/health.js';

const healthRouter = express.Router();

healthRouter.get('/', async (req, res) => {
  try {
    const articles = await healthModel.find({ 'source': { $ne: null } }).sort({ publishedAt: 'desc' }).limit(configs.pageSize).lean();
    if (articles.length > 0) {
      res.status(200).json(articles);
    } else {
      res.status(404).json({ message: 'No articles found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default healthRouter;