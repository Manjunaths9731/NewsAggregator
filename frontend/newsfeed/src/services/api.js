import { config } from "../utils/config";
import axios from 'axios';

const apiService = {
    fetchArticles: async (category) => {
        const url = category === 'general' ? config.api.articles : config.api.articlesByCategory(category);
        try {
            const response = await axios.get(url);

            if (response.status !== 200) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            return response.data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
}



export default apiService;