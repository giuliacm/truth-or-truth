import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const CreateNewGame = ({ onCreate }) => {
  const [newGameName, setNewGameName] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setNewGameName('');
  };

  const handleCreate = () => {
    if (newGameName === '') {
      setError('Please enter a valid name');
    } else {
      onCreate(newGameName);
      handleClose();
    }
  };

  return (
    <Fragment>
      <Button color="primary" onClick={handleOpen}>
        Create New Game
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle id="alert-dialog-title">Create New Game</DialogTitle>
        <DialogContent>
          <TextField
            error={!!error}
            helperText={error}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => setNewGameName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreateNewGame;
