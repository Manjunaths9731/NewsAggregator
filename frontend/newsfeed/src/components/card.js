import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '10px',
    margin: '2px 60px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    borderRadius: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      margin: "10px 10px 0px 10px",
    },
  },
  imageContainer: {
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    marginBottom: '0px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
  },
  source: {
    textAlign: 'left',
    marginBottom: '0px',
  },
  title: {
    marginTop: '0px',
    textAlign: 'left',
  }
}));

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const Card = ({ articles }) => {
  const classes = useStyles();
  const [selectedArticles, setSelectedArticles] = useState([]);

  const selectRandomArticles = () => {
    const newSelectedArticles = [];
    const articleSet = new Set();

    while (newSelectedArticles.length < 4 && articleSet.size < articles.length) {
      const randomIndex = Math.floor(Math.random() * articles.length);
      const selectedArticle = articles[randomIndex];
      if (!articleSet.has(selectedArticle)) {
        articleSet.add(selectedArticle);
        newSelectedArticles.push(selectedArticle);
      }
    }

    setSelectedArticles(newSelectedArticles);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      selectRandomArticles();
    }, 20000); 

    return () => clearInterval(interval); 
  }, [articles]);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        {selectedArticles.length > 0 ? (
          selectedArticles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Grid container spacing={0.5}>
                <Grid item xs={12} className={classes.imageContainer}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <img src={article.urlToImage} alt="Article" className={classes.image} />
                  </a>
                </Grid>
                <Grid item xs={12} className={classes.source}>
                  <Typography>{article.source}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.title}>
                  <Typography>{truncateText(article.title, 90)}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} align="center">
            <Typography variant="body1">Loading News...</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Card;
