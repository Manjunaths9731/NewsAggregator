# NewsAggregator
# NewsHub
NewsHub is a comprehensive news aggregator application that fetches news from various sources and displays them in one place. Users can log in, follow specific news pages, and get real-time updates on their favorite topics. The application is designed to provide a seamless and personalized news reading experience.

# Features
News Aggregation: Collects and displays news from multiple sources to provide a wide range of perspectives.<br />
User Authentication: Allows users to sign up, log in, and manage their profiles.<br />
Follow News Pages: Users can follow specific news pages and receive updates tailored to their interests.<br />
Real-time Updates: Stay up-to-date with the latest news as it happens.<br />
Category-Based Navigation: Easily navigate through different news categories such as General, Business, Entertainment, Health, Science, Sports, and Technology.<br />
Responsive Design: Optimized for both desktop and mobile devices for an optimal reading experience.<br />

# Getting Started
Prerequisites<br />
Ensure you have the following installed:<br />

Node.js<br />
npm (Node Package Manager)<br />
React<br />
Material-UI<br />

# Installation

1.Clone the repository:<br />
git clone https://github.com/yourusername/newshub.git<br />

2.Navigate to the project directory:<br />
cd {project_dir}<br />

3.Install the necessary dependencies:<br />
npm install<br />

4.Running the Application<br />
  Start the development server:<br />
  npm start<br />
  
Open your browser and go to http://localhost:3000 to see the application in action.<br />

# Project Structure<br />
# Frontend<br />
  src/
  components/: Contains the reusable UI components.<br />
  navbar.js: Navigation bar component.<br />
  cards.js: Card list component displaying news articles.<br />
  header.js: Header component.<br />
  card.js: Single card component.<br />
  stockcards.js: Component displaying stock and weather information.<br />
  slider.js: Marquee slider component.<br />
  pages/: Contains the main page components.<br />
  foryou.js: Personalized news page.<br />
  services/: Contains service files for API calls.<br />
  api.js: API service for fetching news articles.<br />
  App.js: Main application component.<br />
  index.js: Entry point of the application.<br />

# Backend
  Details to be provide in .env file in backend/src/env :<br />
  PORT = 4000<br />
  MONGODB_URI = { Go to mongodb.com and create a cluster and provide copy mongo db connect uri and provide here }<br />
  NEWS_API_KEY = { Go to https://newsapi.org/ and take free api key }<br />
  UPDATE_FREQUENCY_HOURS = 1<br />
  UPDATE_FREQUENCY_MINUTES = 10  { Every 10 min cron job starts, basically every 10 min we fetch news from newsapi.org using api and update it in database }<br />
  JWT_SECRET = {some random string }<br />
  WEATHER_API_KEY = { Go to https://openweathermap.org/api and take a free api key } <br />
  STOCK_API_KEY = {Go to https://polygon.io/ and take a free api key }<br />
  
# API Integration
The application uses a custom ApiService to fetch news articles from various sources. This service handles API calls and provides data to the components.<br />

# User Authentication
NewsHub includes a user authentication system where users can sign up and log in. After logging in, users can follow specific news pages and get updates tailored to their interests.<br />
