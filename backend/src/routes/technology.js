import express from 'express';
import configs from '../config/config.js';
import technologyModel from '../models/technology.js';

const technologyRouter = express.Router();

technologyRouter.get('/', async (req, res) => {
  try {
    const articles = await technologyModel.find({ 'source': { $ne: null } }).sort({ publishedAt: 'desc' }).limit(configs.pageSize).lean();
    if (articles.length > 0) {
      res.status(200).json(articles);
    } else {
      res.status(404).json({ message: 'No articles found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default technologyRouter;