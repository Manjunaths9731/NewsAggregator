import express from 'express';
import configs from '../config/config.js';
import businessModel from '../models/business.js';

const businessRouter = express.Router();

businessRouter.get('/', async (req, res) => {
  try {
    const articles = await businessModel.find({ 'source': {$ne: null}}).sort({ publishedAt: 'desc'}).limit(configs.pageSize).lean();
    if(articles.length) {
      res.status(200).json(articles);
    } else {
      res.status(404).json({ message: 'No articles found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
});


export default businessRouter;