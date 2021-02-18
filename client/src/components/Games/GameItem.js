import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';

const GameItem = ({ gameId, gameName, onDelete }) => {
  // const classes = useStyles();
  return (
    <ListItem key={gameId} onClick={() => console.log('clicked game' + gameId)}>
      <ListItemText id={gameId} primary={'Line item ' + gameName} />
      <ListItemSecondaryAction>
        <IconButton onClick={() => console.log('clicked ' + gameName)}>
          <CreateIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            console.log('about to delete game ' + gameId);
            onDelete(gameId);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default GameItem;
