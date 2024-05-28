import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import ApiService from "../services/api";
import CardList from "./cards";
import Header from "./header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card from "./card";
import StockAndWeather from "./stockcards";
import MarqueeSlider from "./slider";
import { Box, Typography } from "@mui/material";
import ForYou from '../pages/foryou';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [generalArticles, setGeneralArticles] = useState([]);
  const moreNewsRef = useRef(null);

  useEffect(() => {
    const fetchGeneralArticles = async () => {
      const response = await ApiService.fetchArticles("general");
      setGeneralArticles(response);
    };
    fetchGeneralArticles();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await ApiService.fetchArticles(category);
      setArticles(response);
    };
    fetchArticles();
  }, [category]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <div>
      <Header title="NewsHub" />
      <Navbar moreNewsRef={moreNewsRef} onCategoryChange={handleCategoryChange} />
      <Box>
        {/* <MarqueeSlider>
          <Typography
            variant="h6"
            component="span"
          >
            {articles[0].title}
          </Typography>
        </MarqueeSlider> */}
      </Box>
      <StockAndWeather location={"Bangalore"} />
      <Card articles={generalArticles} />
      <Routes>
        <Route path="/" element={<CardList articles={articles} moreNewsRef={moreNewsRef} />} />
      </Routes>
    </div>
  );
};

export default Home;
