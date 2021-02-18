import React, { Fragment, useState, useEffect } from 'react';
import CreateNewGame from './Games/CreateNewGame';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GameItem from './Games/GameItem';
import MenuBar from './MenuBar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

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

  const handleDeleteGame = async (gameId) => {
    axios({
      method: 'delete',
      data: { gameId },
      withCredentials: true,
      url: 'http://localhost:5000/games',
    })
      .then((res) => {
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
      url: 'http://localhost:5000/games',
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCreateGame = async (name) => {
    axios({
      method: 'post',
      data: { name, userId: userData.user_id },
      withCredentials: true,
      url: 'http://localhost:5000/games',
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/games',
      withCredentials: true,
      params: { userId: userData.user_id },
    })
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        setGames([]);
      });
  }, [handleCreateGame]);

  return (
    <Fragment>
      <MenuBar username={userData.username} />
      <CreateNewGame userId={userData.user_id} onCreate={handleCreateGame} />
      <Grid container>
        <Grid item xs={4} className={classes.games}>
          <List>
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
