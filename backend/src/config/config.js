import { config } from 'dotenv';

config();
const configs = {
    port: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI,
    pageSize: 100,
    language: 'en',
    newsApiUrl: 'https://newsapi.org/v2/top-headlines',
    apiKey: process.env.NEWS_API_KEY,
    updateFrequency: {
        hour: process.env.UPDATE_FREQUENCY_HOURS,
        minute: process.env.UPDATE_FREQUENCY_MINUTES
    }
}

export default configs;