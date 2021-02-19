import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from './MenuBar';
import CreateNewItem from './ItemUtils/CreateNewItem';
import QuestionItem from './Questions/QuestionItem';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

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
  }, [handleCreateQuestion]);

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      <Grid container>
        <Grid item xs={8} className={classes.questions}>
          <Grid
            xs={6}
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="h4">TODO Question Name</Typography>
            <CreateNewItem onCreate={handleCreateQuestion} type="question" />
          </Grid>

          <List>
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
    </Fragment>
  );
};

export default Questions;
