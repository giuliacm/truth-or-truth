import React, { Fragment, useState } from 'react';
import MenuBar from './MenuBar';
import NoDataMessage from './WarningMessages/NoDataMessage';
import { get, random } from 'lodash';
import { Button, Typography, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NoQuestionsMessage from './WarningMessages/NoQuestionsMessage';

const useStyles = makeStyles((theme) => ({
  main: {
    vh: '90',
  },
  question: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
}));

const randomize = (questions) => {
  return questions ? random(questions.length - 1) : 0;
};

const Play = ({ userData = null, location = {} }) => {
  const classes = useStyles();
  const gameId = get(location, 'state.gameId', null);
  const gameName = get(location, 'state.gameName', null);
  const questions = get(location, 'state.questions', []);

  const [questionIndex, setQuestionIndex] = useState(randomize(questions));
  const question = get(questions[questionIndex], 'description', '');

  const handleNext = () => {
    setQuestionIndex(random(questions.length - 1));
  };

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      {!gameName ? (
        <NoDataMessage />
      ) : questions.length === 0 ? (
        <NoQuestionsMessage gameId={gameId} gameName={gameName} />
      ) : (
        <Container component="main" maxWidth="xl" className={classes.main}>
          <Grid container direction="row" justify="center" alignItems="center">
            in the grid
            <Grid item className={classes.question} xs={2}>
              <Button onClick={handleNext}>Back</Button>
            </Grid>
            <Grid item className={classes.question} xs={6}>
              <Typography variant="h5" align="center">
                {question}
              </Typography>
            </Grid>
            <Grid item className={classes.question} xs={2}>
              <Button onClick={handleNext}>Next</Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

export default Play;
