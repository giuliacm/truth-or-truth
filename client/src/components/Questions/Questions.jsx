import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MenuBar from '../MenuBar';
import NoDataMessage from '../WarningMessages/NoDataMessage';
import CreateNewItem from '../ItemUtils/CreateNewItem';
import QuestionItem from './QuestionItem';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, Typography, ListItem, Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { get } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  questions: {
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
  playButton: {
    fontSize: '1.2rem',
  },
}));

const Questions = ({ userData, location = {} }) => {
  const classes = useStyles();
  const { gameId, gameName } = get(location, 'state', '');
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/questions',
      withCredentials: true,
      params: { gameId },
    })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        setQuestions([]);
      });
  };

  const handleDeleteQuestion = async (questionId) => {
    axios({
      method: 'delete',
      data: { questionId },
      withCredentials: true,
      url: 'http://localhost:5000/questions',
    })
      .then((res) => {
        getQuestions();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleEditQuestion = async (questionId, newDescription) => {
    axios({
      method: 'put',
      data: { questionId, newDescription },
      withCredentials: true,
      url: 'http://localhost:5000/questions',
    })
      .then((res) => {
        getQuestions();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCreateQuestion = async (description) => {
    axios({
      method: 'post',
      data: { description, userId: userData.user_id, gameId },
      withCredentials: true,
      url: 'http://localhost:5000/questions',
    })
      .then((res) => {
        getQuestions();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      {!gameId ? (
        <NoDataMessage />
      ) : (
        <Grid container className={classes.root}>
          <Grid item xs={9} className={classes.questions}>
            <Grid
              xs={12}
              item
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Typography variant="h4">{gameName}</Typography>
              <Button
                align="center"
                className={classes.playButton}
                variant="contained"
                size="large"
                color="primary"
                component={Link}
                to={{
                  pathname: '/play',
                  state: { questions, gameName, gameId },
                }}
              >
                <PlayArrowIcon fontSize="large" />
                Play Game
              </Button>
            </Grid>
            <List>
              <ListItem disableGutters>
                <CreateNewItem
                  onCreate={handleCreateQuestion}
                  type="question"
                />
              </ListItem>
              {questions.map((value) => (
                <QuestionItem
                  key={value.question_id}
                  questionId={value.question_id}
                  questionDescription={value.description}
                  onDelete={handleDeleteQuestion}
                  onEdit={handleEditQuestion}
                />
              ))}
            </List>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default Questions;
