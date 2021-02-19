import React from 'react';
import { Link } from 'react-router-dom';
import EditItem from '../ItemUtils/EditItem';
import DeleteItem from '../ItemUtils/DeleteItem';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

const GameItem = ({ gameId, gameName, onDelete, onEdit }) => {
  return (
    <ListItem
      component={Link}
      to={{ pathname: '/questions', state: { gameId, gameName } }}
      button
      key={gameId}
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
