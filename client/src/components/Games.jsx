import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GameItem from './Games/GameItem';
import MenuBar from './MenuBar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  games: {
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Games = ({ userData }) => {
  const classes = useStyles();

  const [newGameName, setNewGameName] = useState('');
  const [games, setGames] = useState([
    { game_id: 1, name: 'game 1' },
    { game_id: 2, name: 'game 2' },
    { game_id: 3, name: 'game 3' },
    { game_id: 4, name: 'game 4' },
  ]);

  const handleCreateGame = async (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      data: { name: 'new game 2', user_id: userData.user_id },
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

  useEffect(() => {
    const id = userData.user_id;
    axios({
      method: 'get',
      url: 'http://localhost:5000/games',
      withCredentials: true,
      params: { id: userData.user_id },
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
      <Button color="primary" onClick={handleCreateGame}>
        Add game
      </Button>
      <Grid container>
        <Grid item xs={4} className={classes.games}>
          <List>
            {games.map((value) => (
              <GameItem
                key={value.game_id}
                gameId={value.game_id}
                gameName={value.name}
                onDelete={handleDeleteGame}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Games;
