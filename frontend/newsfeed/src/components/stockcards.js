import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import axios from "axios";
import { config } from "../utils/config";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const defaultCompanies = ["IBM", "TCS", "SBI", "HERO"];

const weather_icons = {
  sunny: "☀️",
  "partly cloudy": "🌤️",
  "mostly cloudy": "⛅",
  "partly sunny": "🌥️",
  showers: "🌦️",
  rainy: "🌧️",
  thunderstorm: "🌩️",
  snowy: "🌨️",
  windy: "🌬️",
  foggy: "🌫️",
};

const getWeatherIcon = (weather) => {
  const lowercaseWeather = weather.toLowerCase();
  const words = lowercaseWeather.split(" ");

  for (const word of words) {
    for (let i = 0; i < word.length - 2; i++) {
      const subWord = word.substring(i, i + 3);
      const matchingKey = Object.keys(weather_icons).find((key) =>
        key.includes(subWord)
      );
      if (matchingKey) {
        return weather_icons[matchingKey];
      }
    }
  }

  return null;
};

const useStyles = makeStyles((theme) => ({
  weather: {
    textAlign: "center",
    alignItems: "center",
    margin: "20px",
    [theme.breakpoints.down("sm")]: {
      margin: "10px 4px 0px 10px",
    },
  },
  weatherIcon: {
    fontSize: 48,
    [theme.breakpoints.down("sm")]: {
      fontSize: 36,
    },
  },
  weatherDetails: {
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      gridTemplateRows: "auto auto",
      gridTemplateColumns: "1fr 1fr",
      textAlign: "left",
    },
  },
  stock: {
    margin: "20px",
    [theme.breakpoints.down("sm")]: {
      margin: "10px 4px -22px 10px",
    },
  },
  bold: {
    fontWeight: "bold",
  },
  black: {
    color: "black",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  }
}));

const Weather = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `${config.weatherApi}?loc=${location}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [location]);

  const currentDate = new Date();

  const getCurrentDate = () => {
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const daySuffix = getDaySuffix(day);
  
    return `${day}${daySuffix} ${month} ${year}`;
  }
  
  const getDay = () => {
    return `${currentDate.toLocaleString('default', { weekday: 'long' })}`
  }
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  const getCurrentTime = () => {
    const currentTime = new Date();
    let hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  return (
    <Card className={classes.weather}>
      <CardContent>
        {weatherData ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <span className={classes.weatherIcon}>
                    {getWeatherIcon(weatherData.weather)}
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="h5" component="h2">
                      {weatherData.location}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {weatherData.weather}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={`${classes.bold} ${classes.black}`}
                    >
                      {weatherData.temperature}°C
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="h5" component="h2">
                      Briefing
                    </Typography>
                    <Typography variant="body2" component="p">
                      {getCurrentDate()}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {getDay()}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="h5" component="h2">
                      {getCurrentTime()}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Loading weather data...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

const Stock = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomCompany = getRandomCompany();
        const date = getDate();
        const response = await axios.get(
          `${config.stockApi}?company=${randomCompany}&date=${date}`
        );
        if (response.status === 200) {
          setStockData(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        setError("Error fetching stock data");
      }
    };

    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 30 seconds
    }, 30000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []);

  const getRandomCompany = () => {
    const randomIndex = Math.floor(Math.random() * defaultCompanies.length);
    return defaultCompanies[randomIndex];
  };

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() - 2).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  return (
    <Card className={classes.stock}>
      <CardContent>
        {stockData ? (
          <a href="https://www.nseindia.com/" style={{ textDecoration: "none" }}>
            <Typography variant="h5" component="h2" className={classes.black}>
              {stockData.symbol}
              {stockData.open >= stockData.close ? <ArrowDropUpIcon fontSize='medium'/> : <ArrowDropDownIcon fontSize='medium'/>}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  component="p"
                  className={`${classes.black}`}
                >
                  Open:{" "}
                </Typography>
                <Typography variant="body2" component="p" className={classes.black}>
                  {stockData.open}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  component="p"
                  className={`${classes.black}`}
                >
                  High:{" "}
                </Typography>
                <Typography variant="body2" component="p" className={classes.green}>
                  {stockData.high}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  component="p"
                  className={`${classes.black}`}
                >
                  Low:{" "}
                </Typography>
                <Typography variant="body2" component="p" className={classes.red}>
                  {stockData.low}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  component="p"
                  className={`${classes.black}`}
                >
                  Close:{" "}
                </Typography>
                <Typography variant="body2" component="p" className={classes.black}>
                  {stockData.close}
                </Typography>
              </Grid>
            </Grid>
          </a>
        ) : (
          <Typography variant="body1">Loading stock data...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

const StockAndWeather = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Stock />
      </Grid>
      <Grid item xs={12} md={6}>
        <Weather location="Bangalore" />
      </Grid>
    </Grid>
  );
};

export default StockAndWeather;