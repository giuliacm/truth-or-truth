import React from 'react';
import { Link } from 'react-router-dom';
import EditItem from '../ItemUtils/EditItem';
import DeleteItem from '../ItemUtils/DeleteItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const QuestionItem = ({
  questionId,
  questionDescription,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();
  return (
    <ListItem
      //   component={Link}
      //   to="/questions"
      //   button
      key={questionId}
      onClick={() => console.log('clicked game' + questionId)}
      className={classes.root}
    >
      <ListItemText id={questionId} primary={questionDescription} />
      <ListItemSecondaryAction>
        <EditItem
          id={questionId}
          itemText={questionDescription}
          onEdit={onEdit}
          type="question"
        />
        <DeleteItem
          id={questionId}
          item={questionDescription}
          onDelete={onDelete}
          type="question"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default QuestionItem;
