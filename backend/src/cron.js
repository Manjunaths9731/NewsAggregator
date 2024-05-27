import cron from "node-cron";
import configs from "./config/config.js";
import businessRouter from "./models/business.js";
import entertainmentRouter from "./models/entertainment.js";
import generalRouter from "./models/general.js";
import healthRouter from "./models/health.js";
import scienceRouter from "./models/science.js";
import sportsRouter from "./models/sports.js";
import technologyRouter from "./models/technology.js";
import logger from "./utils/logger.js";
import axios from 'axios';

const categories = [
    businessRouter,
    entertainmentRouter,
    generalRouter,
    healthRouter,
    scienceRouter,
    sportsRouter,
    technologyRouter,
];

const buildUrl = (category) => {
  const { apiKey, newsApiUrl, pageSize, language } = configs;
  const params = new URLSearchParams();
  params.append("category", category.toLowerCase());
  params.append("language", language);
  params.append("pageSize", pageSize);
  params.append("apiKey", apiKey);

  return `${newsApiUrl}?${params.toString()}`;
};

const fetchNewsArticles = async (model) => {
    const category = model.collection.collectionName;
    try {
        const url = buildUrl(category);
        const response = await axios.get(url);
        const articles = response.data.articles.map((article) => {
            const source = article.source.name;
            const { author, title, description, url, urlToImage, publishedAt, content } = article;
            return {
                source, author, title, description, url, urlToImage, publishedAt, content,
            };
        });
        const existingArticles = await model.find({ url: { $in: articles.map((article) => article.url)}});
        const existingUrls = existingArticles.map((article) => article.url);
        const newArticles = articles.filter((article) => !existingUrls.includes(article.url));
        if(newArticles.length) {
            const articlesToInsert = await model.insertMany(newArticles);
            logger.info(`Inserted ${articlesToInsert.length} articles for ${category}`);
        } else {
            logger.info(`No new articles for ${category}`);
        }
    } catch (error) {
        logger.error(`Error fetching articles for ${category}:`, error);
    };
}

const startCronJob = async () => {
    cron.schedule(`*/${parseInt(configs.updateFrequency.minute)} */${parseInt(configs.updateFrequency.hour)} * * *`, async () => {
        for(const category of categories){
            logger.info(`Updating Database for ${category.collection.collectionName}`);
            await fetchNewsArticles(category);
        }
    });
};

export default startCronJob;
