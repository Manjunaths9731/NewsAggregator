import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Typography, Button } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 355,
    height: 520,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    display: "flex",
    flexWrap: "wrap",
    textAlign: 'left',
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      height: "auto",
      margin: "10px 0",
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
      fontSize: "1rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
      },
    },
    "& .MuiCardHeader-subheader": {
      fontSize: "0.8rem", 
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.7rem", 
      },
    },
    textAlign: 'center',
    margin: '20px 0',
  },
  content: {
    fontFamily: "Open Sans",
    "& .MuiTypography-body2": {
      fontSize: "0.875rem", 
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.75rem",
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
  image: {
    width: '100%',
    height: '50%',
    objectFit: 'cover'
  },
}));

const CardList = ({ articles, moreNewsRef }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [loading, setLoading] = useState(false);
  const [allArticles, setAllArticles] = useState([]);

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
    setTimeout(() => {
      setAllArticles((prevArticles) => [...prevArticles, ...articles]);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setAllArticles(articles);
  }, [articles]);

  return (
    <div style={{ padding: "10px 20px 0px 20px" }} id="moreNews" ref={moreNewsRef}>
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
                {article.urlToImage && (
                  <img src={article.urlToImage} alt="Article" className={classes.image} />
                )}
                <CardContent className={classes.content}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {truncate(article.description, 90)}
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
