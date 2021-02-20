import React, { useState, Fragment } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const CreateNewItem = ({ onCreate, type }) => {
  const [newItemText, setNewItemText] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const keyword = type === 'question' ? 'description' : 'name';
  const title = type === 'question' ? 'Create New Question' : 'Create New Game';
  const label = type === 'question' ? 'Description' : 'Name';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setNewItemText('');
  };

  const handleCreate = () => {
    if (newItemText === '') {
      setError('Please enter a valid ' + keyword);
    } else {
      onCreate(newItemText);
      handleClose();
    }
  };

  return (
    <Fragment>
      <Button
        size="large"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        color="primary"
      >
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TextField
            error={!!error}
            helperText={error}
            autoFocus
            margin="dense"
            id={keyword}
            label={label}
            type="text"
            fullWidth
            onChange={(e) => setNewItemText(e.target.value)}
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

export default CreateNewItem;
