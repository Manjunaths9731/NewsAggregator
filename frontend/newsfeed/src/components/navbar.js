import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'none',
    margin: '0 26px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      margin: '0 5px',
    },
  },
  toolbar: {
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      marginLeft: '0px',
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
}));

const Navbar = ({ onCategoryChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = React.useState('general');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onCategoryChange(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'general')}>Home</Button>
          <Button color="inherit" className={classes.button} component={Link} to='/foryou'>ForYou</Button>
          <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'general')}>General</Button>
          <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'business')}>Business</Button>
          <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'entertainment')}>Entertainment</Button>
          <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'health')}>Health</Button>
          <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'science')}>Science</Button>
          <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'sports')}>Sports</Button>
          <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'technology')}>Technology</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
