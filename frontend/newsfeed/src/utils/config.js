const { BASE_URL, PORT } = process.env;

export const apiUrl = 'http://localhost:4000';

export const config = {
    api: {
        articles: `${apiUrl}/news/`,
        articlesByCategory: (category) => `${apiUrl}/news/${category}`
    },
    userSignUpApi: `${apiUrl}/news/signUp`,
    userSignInApi: `${apiUrl}/news/signIn`,
    weatherApi: `${apiUrl}/news/weather`,
    stockApi: `${apiUrl}/news/stock`,
    newsListApi: `${apiUrl}/news/newsList`,
    followingApi: `${apiUrl}/news/following`,
}