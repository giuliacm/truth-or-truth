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

const GameItem = ({ gameId, gameName, onDelete, onEdit }) => {
  const classes = useStyles();
  return (
    <ListItem
      component={Link}
      to="/questions"
      button
      key={gameId}
      className={classes.root}
    >
      <ListItemText id={gameId} primary={gameName} />
      <ListItemSecondaryAction>
        <EditItem id={gameId} itemText={gameName} onEdit={onEdit} type="game" />
        <DeleteItem
          id={gameId}
          item={gameName}
          onDelete={onDelete}
          type="game"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GameItem;
