import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  heading: {
    display: 'block',
    fontWeight: '600',
    fontSize: '2rem',
    color: '#424242',
    textAlign: 'center',
    '@media (max-width: 320px)': {
      fontSize: '1.5rem',
    },
  },
}));

const Heading = ({ title }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="button" className={classes.heading}>
        {title}
      </Typography>
    </>
  );
};

export default Heading;
