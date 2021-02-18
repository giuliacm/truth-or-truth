import React from 'react';
import DeleteGameItem from './DeleteGameItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import EditGameItem from './EditGameItem';

const GameItem = ({ gameId, gameName, onDelete, onEdit }) => {
  // const classes = useStyles();
  return (
    <ListItem key={gameId} onClick={() => console.log('clicked game' + gameId)}>
      <ListItemText id={gameId} primary={gameName} />
      <ListItemSecondaryAction>
        <EditGameItem gameId={gameId} gameName={gameName} onEdit={onEdit} />
        <DeleteGameItem
          gameId={gameId}
          gameName={gameName}
          onDelete={onDelete}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GameItem;
