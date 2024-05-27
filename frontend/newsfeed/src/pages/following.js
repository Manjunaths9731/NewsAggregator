import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItemText,
  Card,
  CardContent,
  Typography,
  Container,
  Avatar,
  Tabs,
  Tab,
  Box,
  makeStyles,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Header from "../components/header";
import { Link as RouterLink } from "react-router-dom";
import { config } from "../utils/config";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
    maxHeight: '600px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  card: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0.2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '10px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e6e6e6',
    },
  },
  button: {
    flex: '0 0 auto',
    marginLeft: theme.spacing(1),
    minWidth: 'auto',
    padding: theme.spacing(0.5, 1),
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  tabs: {
    marginBottom: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  loginMessage: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  smallText: {
    fontSize: '0.75rem',
  },
  mediumText: {
    fontSize: '1rem',
  },
}));

const Following = () => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [newsSources, setNewsSources] = useState([]);
  const [followStatus, setFollowStatus] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      setEmail(decoded.email);

      axios.get(`${config.newsListApi}`)
        .then((response) => {
          setNewsSources(response.data.newsList);
          return axios.get(`${config.followingApi}?email=${decoded.email}`);
        })
        .then((response) => {
          const followedChannels = response.data.channels;
          const initialFollowStatus = {};
          newsSources.forEach((source) => {
            initialFollowStatus[source] = followedChannels.includes(source);
          });
          setFollowStatus(initialFollowStatus);
        })
        .catch((error) => {
          console.error("There was an error fetching data!", error);
        });
    }
  }, [newsSources.length]);

  const handleFollowToggle = async (source) => {
    const updatedStatus = !followStatus[source];
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [source]: updatedStatus,
    }));

    try {
      if (updatedStatus) {
        // Follow channel (POST)
        await axios.post(`${config.followingApi}`, {
          email,
          channel: source,
        });
      } else {
        // Unfollow channel (DELETE)
        await axios.delete(`${config.followingApi}`, {
          data: { email, channel: source },
        });
      }
    } catch (error) {
      console.error('There was an error updating the follow status!', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container className={classes.root}>
        <Typography variant="h4" className={classes.header}>
          News Sources
        </Typography>
        {isLoggedIn ? (
          <Box className={classes.container}>
            <Tabs value={selectedTab} onChange={handleTabChange} className={classes.tabs} centered>
              <Tab label="Following" />
              <Tab label="Follow" />
            </Tabs>
            <List>
              {newsSources.filter(source => (selectedTab === 0 ? followStatus[source] : !followStatus[source])).map((source) => (
                <Card key={source} className={classes.card}>
                 

                  <CardContent className={classes.listItem}>
                    <Avatar className={classes.avatar}>{source.charAt(0)}</Avatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          className={isSmallScreen ? classes.smallText : classes.mediumText}
                        >
                          {source}
                        </Typography>
                      }
                    />
                    <Button
                      variant="contained"
                      color={followStatus[source] ? "secondary" : "primary"}
                      onClick={() => handleFollowToggle(source)}
                      className={classes.button}
                    >
                      {followStatus[source] ? "Following" : "Follow"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        ) : (
          <Typography variant="h6" className={classes.loginMessage}>
            Please <RouterLink to="/signin">sign in</RouterLink> to follow news sources.
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Following;
