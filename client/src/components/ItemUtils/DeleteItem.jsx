import React, { useState, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Typography } from '@material-ui/core';

const DeleteItem = ({ id, item, onDelete, type }) => {
  const [open, setOpen] = useState(false);
  const title = type === 'question' ? 'Delete Question' : 'Delete Game';
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle id="alert-dialog-title">{title} </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography component="span">
              Are you sure you want to delete{' '}
              <Box
                component="span"
                fontWeight="fontWeightBold"
                fontStyle="italic"
                display="inline"
              >
                {item}
              </Box>
              ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onDelete(id)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteItem;
