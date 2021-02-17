import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import '@fontsource/paytone-one';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Paytone One',
    paddingLeft: theme.spacing(3),
  },
  menu: {
    '&:focus': {
      outline: 'none',
    },
  },
}));

const MenuBar = ({ username }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = async (e) => {
    e.preventDefault();
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/logout',
    })
      .then((res) => {
        console.log(res);
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            Truth or Truth
          </Typography>
          <div>
            <Button
              size="large"
              color="inherit"
              className={classes.menu}
              endIcon={<AccountCircle />}
              onClick={handleMenu}
            >
              {username}
            </Button>
            <Menu
              id="menu-appbar"
              getContentAnchorEl={null}
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem component={Link} to="/games">
                Games
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
