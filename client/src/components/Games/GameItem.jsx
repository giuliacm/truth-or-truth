import React from 'react';
import DeleteGameItem from './DeleteGameItem';
import EditGameItem from './EditGameItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { makeStyles } from '@material-ui/core/styles';

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
        <IconButton onClick={() => console.log('should redirect to play')}>
          <PlayCircleOutlineIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GameItem;
