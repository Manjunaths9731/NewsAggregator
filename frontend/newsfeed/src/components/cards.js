import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 355,
    height: 430,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    margin: "10px", // Default margin
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      height: "auto",
      margin: "10px 0", // Adjusted margin for mobile
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  header: {
    fontFamily: "Open Sans",
    color: "#333",
    "& .MuiCardHeader-title": {
      fontSize: "1rem", // Default font size
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem", // Smaller font size for mobile
      },
    },
    "& .MuiCardHeader-subheader": {
      fontSize: "0.8rem", // Default subheader size
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.7rem", // Smaller subheader size for mobile
      },
    },
  },
  content: {
    fontFamily: "Open Sans",
    "& .MuiTypography-body2": {
      fontSize: "0.875rem", // Default body size
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.75rem", // Smaller body size for mobile
      },
    },
  },
  moreNewsButton: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "20px 0",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "20px 0",
  },
  header: {
    fontFamily: 'Open Sans',
    color: '#333',
    textAlign: 'center',
    margin: '20px 0',
  }
}));

const CardList = ({ articles }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [loading, setLoading] = useState(false);
  const [allArticles, setAllArticles] = useState(articles);

  const truncate = (text, limit) => {
    if (text && text.length > limit) {
      return `${text.substring(0, limit)}...`;
    }
    return text;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMoreArticles = () => {
    setLoading(true);
    // Simulate an API call to fetch more articles
    setTimeout(() => {
      const moreArticles = articles.slice(0, 4); // Replace with actual API call
      setAllArticles((prevArticles) => [...prevArticles, ...moreArticles]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "10px 20px 0px 20px" }}>
      <Typography variant="h4" className={classes.header}>
        More News
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: isMobile ? "10px 0" : "10px 60px",
        }}
      >
        {allArticles.length > 0 &&
          allArticles.map((article, index) => (
            <Button
              key={`${article.title}-${index}`}
              component="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: isMobile ? "100%" : "auto", padding: 0 }}
            >
              <Card className={classes.root}>
                <CardHeader
                  title={truncate(article.title, 100)}
                  subheader={new Date(article.publishedAt).toLocaleDateString()}
                  className={classes.header}
                />
                <CardMedia
                  className={classes.media}
                  image={article.urlToImage}
                  title={article.title}
                />
                <CardContent className={classes.content}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {truncate(article.description, 100)}
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          ))}
      </div>
      {loading && (
        <div className={classes.loading}>
          <Typography variant="body1">Loading more...</Typography>
        </div>
      )}
      {!loading && (
        <div className={classes.moreNewsButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={loadMoreArticles}
          >
            More News
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardList;
