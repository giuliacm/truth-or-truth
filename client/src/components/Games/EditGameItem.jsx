import React, { useState, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const EditGameItem = ({ gameId, gameName, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [newGameName, setNewGameName] = useState('');
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setNewGameName('');
  };

  const handleUpdate = () => {
    if (newGameName === gameName) {
      setError('Please select a new name');
    } else if (newGameName === '') {
      setError('Please enter a valid name');
    } else {
      onEdit(gameId, newGameName);
      handleClose();
    }
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <CreateIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle id="alert-dialog-title">Edit Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Update the name of ' + gameName + ':'}
          </DialogContentText>
          <TextField
            error={!!error}
            helperText={error}
            autoFocus
            margin="dense"
            id="name"
            label="New name"
            type="text"
            fullWidth
            onChange={(e) => setNewGameName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditGameItem;
