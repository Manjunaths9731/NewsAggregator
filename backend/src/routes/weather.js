import axios from 'axios';
import express from 'express';

const weatherRouter = express.Router();

weatherRouter.get('/' , async (req,res) => {
    try {
        const { loc } = req.query;
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${process.env.WEATHER_API_KEY}`);
        const { name: location } = response.data;
        const { description: weather } = response.data.weather[0];
        const { temp: temperature } = response.data.main;
    
        res.status(200).json({ location, weather, temperature });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

export default weatherRouter;