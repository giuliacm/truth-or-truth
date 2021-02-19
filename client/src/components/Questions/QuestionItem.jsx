import React from 'react';
import EditItem from '../ItemUtils/EditItem';
import DeleteItem from '../ItemUtils/DeleteItem';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}));

const QuestionItem = ({
  questionId,
  questionDescription,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();
  return (
    <ListItem key={questionId} className={classes.root}>
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
