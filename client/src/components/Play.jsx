import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import MenuBar from './MenuBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  noData: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
}));

const Play = ({ userData = null, gameId = null }) => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/questions',
      withCredentials: true,
      params: { gameId },
    })
      .then((res) => {
        console.log('in set question');
        console.log(res);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
        setQuestions([]);
      });
  }, []);

  const noData = (
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

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      {!gameId ? noData : <div>there's data</div>}
    </Fragment>
  );
};

export default Play;
