import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#0e3899',
  },
  button: {
    textTransform: 'none',
    fontWeight: 'bold',
    margin: '0 18px',
    padding: '6px 12px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 4px',
    },
  },
  toolbar: {
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      padding: '0 8px',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
}));

const Navbar = ({ moreNewsRef, onCategoryChange }) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    onCategoryChange(newValue);
    moreNewsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Box display="flex">
            <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'general')}>Home</Button>
            <Button color="inherit" className={classes.button} component={Link} to='/foryou'>For You</Button>            <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'general')}>General</Button>
            <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'business')}>Business</Button>
            <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'entertainment')}>Entertainment</Button>
            <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'health')}>Health</Button>
            <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'science')}>Science</Button>
            <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'sports')}>Sports</Button>
            <Button color="inherit" className={classes.button} onClick={(event) => handleChange(event, 'technology')}>Technology</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
