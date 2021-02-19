import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from '../MenuBar';
import NoDataMessage from '../NoDataMessage';
import CreateNewItem from '../ItemUtils/CreateNewItem';
import QuestionItem from './QuestionItem';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, Typography, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  questions: {
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Questions = ({ userData }) => {
  const classes = useStyles();
  const gameId = 39;

  const [questions, setQuestions] = useState([]);

  const handleDeleteQuestion = async (questionId) => {
    axios({
      method: 'delete',
      data: { questionId },
      withCredentials: true,
      url: 'http://localhost:5000/questions',
    })
      .then((res) => {
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
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
  }, []);

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      {!gameId ? (
        <NoDataMessage />
      ) : (
        <Grid container>
          <Grid item xs={8} className={classes.questions}>
            <Typography variant="h4">TODO Game Name</Typography>
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
