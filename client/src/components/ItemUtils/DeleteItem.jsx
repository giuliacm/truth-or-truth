import React, { useState, Fragment } from 'react';
import {
  Typography,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
