import React from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const MenuBar = ({ username }) => {
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
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Button onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
