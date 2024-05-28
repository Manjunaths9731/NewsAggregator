import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { makeStyles, ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const theme = createTheme({
  palette: {
    primary: {
      main: '#242b8a',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  navbar: {
    backgroundColor: theme.palette.primary.main,
  },
  profileAvatar: {
    cursor: 'pointer',
    marginLeft: theme.spacing(2),
  },
  button: {
    textTransform: 'none',
    fontWeight: 'bold',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      margin: '0px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      try {
        const decryptedToken = jwtDecode(token);
        if (decryptedToken && decryptedToken.email) {
          setUserEmail(decryptedToken.email);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error decrypting token:", error);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    setIsLoggedIn(false);
    setAnchorEl(null);
    navigate('/');
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.title}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '8px', fontWeight: 'bold' }}>NewsHub</Link>
        </Typography>
        {isLoggedIn ? (
          <>
            <Button
              component={Link}
              to="/following"
              color="inherit"
              className={classes.button}
            >
              Following
            </Button>
            <Avatar onClick={handleAvatarClick} className={classes.profileAvatar}>
              {userEmail.charAt(0).toUpperCase()}
            </Avatar>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              style={{ marginTop: '30px' }}
            >
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/following"
              color="inherit"
              className={classes.button}
            >
              Following
            </Button>
            <Button
              component={Link}
              to="/signIn"
              color="inherit"
              className={classes.button}
            >
              Sign In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Header />
  </ThemeProvider>
);

export default App;
