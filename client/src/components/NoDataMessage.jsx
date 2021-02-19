import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  noData: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
}));

const NoDataMessage = () => {
  const classes = useStyles();

  return (
    <Grid item className={classes.noData}>
      <Typography variant="h5" align="center">
        Oops! It looks like you have no data. <br />
        Return to the{' '}
        <Link component={RouterLink} to="/games">
          Games Menu
        </Link>{' '}
        to create a game.
      </Typography>
    </Grid>
  );
};

export default NoDataMessage;
