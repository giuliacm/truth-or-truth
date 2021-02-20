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

const NoQuestionsMessage = ({ gameId, gameName }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.noData}>
      <Typography variant="h5" align="center">
        Oops! It looks like you have no questions. <br />
        Return to{' '}
        <Link
          component={RouterLink}
          to={{ pathname: '/questions', state: { gameId, gameName } }}
        >
          {gameName}
        </Link>{' '}
        to create a question.
      </Typography>
    </Grid>
  );
};

export default NoQuestionsMessage;
