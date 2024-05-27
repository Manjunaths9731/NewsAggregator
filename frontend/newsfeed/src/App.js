import React, { useState, useEffect } from 'react';
import SignIn from './pages/signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import Home from './components/home';
import Following from './pages/following';
import ForYou from './pages/foryou';
import apiService from './services/api';

const App = () => {
  const [generalArticles, setGeneralArticles] = useState([]);

  useEffect(() => {
    const fetchGeneralArticles = async () => {
      const response = await apiService.fetchArticles("general");
      setGeneralArticles(response);
    };
    fetchGeneralArticles();
  });

  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/foryou" element={<ForYou articles={generalArticles}/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
  );
};

export default App;
