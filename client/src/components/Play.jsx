import React, { Fragment, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MenuBar from './MenuBar';
import NoDataMessage from './WarningMessages/NoDataMessage';
import NoQuestionsMessage from './WarningMessages/NoQuestionsMessage';
import { get, random } from 'lodash';
import {
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  IconButton,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  backButton: { marginTop: theme.spacing(4) },
  questionCard: {
    width: '50vw',
    height: '50vh',
    borderRadius: '40px',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
          <Grid item className={classes.backButton}>
            <Button
              size="large"
              startIcon={<ArrowBackIosIcon />}
              color="primary"
              component={RouterLink}
              to={{ pathname: '/questions', state: { gameId, gameName } }}
            >
              Back to questions
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ minHeight: '80vh' }}
            align="center"
          >
            <Grid item xs={2} />
            <Grid item xs={6}>
              <Card className={classes.questionCard}>
                <CardContent>
                  <Typography variant="h2">{question}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={handleNext}>
                <ArrowForwardIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

export default Play;
