import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

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
      <IconButton onClick={handleOpen} color="primary">
        <AddCircleOutlineIcon />
      </IconButton>
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
