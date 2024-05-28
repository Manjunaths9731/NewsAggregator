# NewsAggregator
# NewsHub
NewsHub is a comprehensive news aggregator application that fetches news from various sources and displays them in one place. Users can log in, follow specific news pages, and get real-time updates on their favorite topics. The application is designed to provide a seamless and personalized news reading experience.

# Features
News Aggregation: Collects and displays news from multiple sources to provide a wide range of perspectives.
User Authentication: Allows users to sign up, log in, and manage their profiles.
Follow News Pages: Users can follow specific news pages and receive updates tailored to their interests.
Real-time Updates: Stay up-to-date with the latest news as it happens.
Category-Based Navigation: Easily navigate through different news categories such as General, Business, Entertainment, Health, Science, Sports, and Technology.
Responsive Design: Optimized for both desktop and mobile devices for an optimal reading experience.

# Getting Started
Prerequisites
Ensure you have the following installed:

Node.js
npm (Node Package Manager)
React
Material-UI

# Installation

1.Clone the repository:
git clone https://github.com/yourusername/newshub.git

2.Navigate to the project directory:
cd {project_dir}

3.Install the necessary dependencies:
npm install

4.Running the Application
  Start the development server:
  npm start
  
Open your browser and go to http://localhost:3000 to see the application in action.

# Project Structure
# Frontend
  src/
  components/: Contains the reusable UI components.
  navbar.js: Navigation bar component.
  cards.js: Card list component displaying news articles.
  header.js: Header component.
  card.js: Single card component.
  stockcards.js: Component displaying stock and weather information.
  slider.js: Marquee slider component.
  pages/: Contains the main page components.
  foryou.js: Personalized news page.
  services/: Contains service files for API calls.
  api.js: API service for fetching news articles.
  App.js: Main application component.
  index.js: Entry point of the application.

# Backend
  Details to be provide in .env file in backend/src/env :
  PORT = 4000
  MONGODB_URI = { Go to mongodb.com and create a cluster and provide copy mongo db connect uri and provide here }
  NEWS_API_KEY = { Go to https://newsapi.org/ and take free api key }
  UPDATE_FREQUENCY_HOURS = 1
  UPDATE_FREQUENCY_MINUTES = 10  { Every 10 min cron job starts, basically every 10 min we fetch news from newsapi.org using api and update it in database }
  JWT_SECRET = {some random string }
  WEATHER_API_KEY = { Go to https://openweathermap.org/api and take a free api key } 
  STOCK_API_KEY = {Go to https://polygon.io/ and take a free api key }
  
# API Integration
The application uses a custom ApiService to fetch news articles from various sources. This service handles API calls and provides data to the components.

# User Authentication
NewsHub includes a user authentication system where users can sign up and log in. After logging in, users can follow specific news pages and get updates tailored to their interests.
