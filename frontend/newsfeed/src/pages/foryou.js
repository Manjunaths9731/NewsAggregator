import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardMedia, CardContent, Typography, Button, Container } from "@material-ui/core";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { config } from "../utils/config";
import Header from "../components/header";

const useStyles = makeStyles({
  root: {
    maxWidth: 375,
    height: 560,
    background: '#fff',
    borderRadius: 18,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    margin: '10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  header: {
    marginTop: '20px',
    marginBottom: '20px',
  },
});

const ForYou = ({ articles }) => {
  const classes = useStyles();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchFollowedChannels = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        const decoded = jwtDecode(token);
        const email = decoded.email;

        try {
          const response = await axios.get(`${config.followingApi}?email=${email}`);
          const followedChannels = response.data.channels;

          const filtered = articles.filter(article =>
            followedChannels.includes(article.source)
          );

          setFilteredArticles(filtered);
        } catch (error) {
          console.error("Error fetching followed channels", error);
        }
      }
    };

    fetchFollowedChannels();
  }, [articles]);

  const truncate = (text, limit) => {
    if (text && text.length > limit) {
      return `${text.substring(0, limit)}...`;
    }
    return text;
  };

  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h4" className={classes.header}>
          For You
        </Typography>
        {isLoggedIn ? (
          <div className={classes.cardContainer}>
            {filteredArticles.length > 0 && filteredArticles.map((article, index) => (
              <Button
                key={index}
                component="a"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className={classes.root}>
                  <CardHeader
                    title={truncate(article.title, 100)}
                    subheader={article.publishedAt}
                    style={{ fontSize: '0.5rem', fontFamily: 'Open Sans', color: '#333' }}
                  />
                  <CardMedia className={classes.media} image={article.urlToImage} title={article.title} />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {truncate(article.description, 80)}
                    </Typography>
                  </CardContent>
                </Card>
              </Button>
            ))}
          </div>
        ) : (
          <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>
            Please <a href="/signin">sign in</a> to see your personalized news feed.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default ForYou;
