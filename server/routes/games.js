const express = require('express');
const router = express.Router();
const pool = require('../db');

// create a game
router.post('/', async (req, res) => {
  try {
    const { name, user_id } = req.body;
    const newGame = await pool.query(
      'INSERT INTO games (name, user_id) VALUES($1, $2) RETURNING *',
      [name, user_id]
    );
    res.json(newGame.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get all games for given user
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.body;
    const allGames = await pool.query(
      'SELECT * FROM games WHERE user_id = $1',
      [user_id]
    );
    res.json(allGames.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// delete a game TODO with all questions, and permissions
router.delete('/', async (req, res) => {
  try {
    const { game_id } = req.body;
    const deleteGame = await pool.query(
      'DELETE FROM games WHERE game_id = $1',
      [game_id]
    );
    res.json('successfully deleted game');
  } catch (err) {
    console.log(err.message);
  }
});

// update game name
router.put('/', async (req, res) => {
  try {
    const { new_name, game_id } = req.body;
    const newGame = await pool.query(
      'UPDATE games SET name = $1 WHERE game_id = $2',
      [new_name, game_id]
    );
    res.json('games name updated');
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;