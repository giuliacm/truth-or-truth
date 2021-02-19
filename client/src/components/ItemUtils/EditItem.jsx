import React, { useState, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DialogContentText from '@material-ui/core/DialogContentText';

const EditItem = ({ id, itemText, onEdit, type }) => {
  const [open, setOpen] = useState(false);
  const [updatedText, setUpdatedText] = useState('');
  const [error, setError] = useState(null);

  const keyword = type === 'question' ? 'description' : 'name';
  const title = type === 'question' ? 'Edit Question' : 'Edit Game';
  const label = type === 'question' ? 'New description' : 'New name';
  console.log('in edit item');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setUpdatedText('');
  };

  const handleUpdate = () => {
    if (updatedText === itemText) {
      setError('Please select a new ' + keyword);
    } else if (updatedText === '') {
      setError('Please enter a valid ' + keyword);
    } else {
      onEdit(id, updatedText);
      handleClose();
    }
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <CreateIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="span">
              Update the {keyword} of{' '}
              <Box
                component="span"
                fontWeight="fontWeightBold"
                fontStyle="italic"
                display="inline"
              >
                {itemText}
              </Box>
              :
            </Typography>
          </DialogContentText>
          <TextField
            error={!!error}
            helperText={error}
            autoFocus
            margin="dense"
            id={keyword}
            label={label}
            type="text"
            fullWidth
            onChange={(e) => setUpdatedText(e.target.value)}
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

export default EditItem;
