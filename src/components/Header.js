import React from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  makeStyles,
} from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  spaceBetween: {
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoWidth: {
    maxWidth: '80%',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar className={classes.spaceBetween}>
            <IconButton
              href="https://github.com/darshsoni28"
              target="_blank"
              color="inherit"
            >
              <GitHub />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
