import axios from 'axios';
import express from 'express';

const stockRouter = express.Router();

stockRouter.get('/' , async (req,res) => {
    try {
        const { company, date } = req.query;
        const response = await axios.get(
            `https://api.polygon.io/v1/open-close/${company}/${date}?adjusted=true&apiKey=${process.env.STOCK_API_KEY}`
          );
    
        res.status(200).json(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

export default stockRouter;