import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import CreateNewItem from '../ItemUtils/CreateNewItem';
import GameItem from './GameItem';
import MenuBar from '../MenuBar';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, Typography, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  games: {
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Games = ({ userData }) => {
  const classes = useStyles();
  const [games, setGames] = useState([]);

  const getGames = () => {
    axios({
      method: 'get',
      url: '/games',
      withCredentials: true,
      params: { userId: userData.user_id },
    })
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        setGames([]);
      });
  };

  const handleDeleteGame = async (gameId) => {
    axios({
      method: 'delete',
      data: { gameId },
      withCredentials: true,
      url: '/games',
    })
      .then((res) => {
        getGames();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleEditGame = async (gameId, newGameName) => {
    axios({
      method: 'put',
      data: { gameId, newGameName },
      withCredentials: true,
      url: '/games',
    })
      .then((res) => {
        getGames();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCreateGame = async (name) => {
    console.log('in create game');
    axios({
      method: 'post',
      data: { name, userId: userData.user_id },
      withCredentials: true,
      url: '/games',
    })
      .then((res) => {
        getGames();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      <Grid container>
        <Grid item xs={6} className={classes.games}>
          <Typography variant="h4">Games Menu</Typography>
          <List>
            <ListItem disableGutters>
              <CreateNewItem onCreate={handleCreateGame} type="game" />
            </ListItem>
            {games.map((value) => (
              <GameItem
                key={value.game_id}
                gameId={value.game_id}
                gameName={value.name}
                onDelete={handleDeleteGame}
                onEdit={handleEditGame}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Games;
