const express = require('express');
const router = express.Router();
const pool = require('../db');

// create a game
router.post('/', async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newGame = await pool.query(
      'INSERT INTO games (name, user_id) VALUES($1, $2) RETURNING *',
      [name, userId]
    );
    res.json(newGame.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get all games for given user
router.get('/', async (req, res) => {
  try {
    const allGames = await pool.query(
      'SELECT * FROM games WHERE user_id = $1',
      [req.query.userId]
    );
    res.json(allGames.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// delete a game TODO with all questions, and permissions
router.delete('/', async (req, res) => {
  try {
    const { gameId } = req.body;
    await pool.query('DELETE FROM games WHERE game_id = $1', [gameId]);
    res.json('Successfully deleted game');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// update game name
router.put('/', async (req, res) => {
  try {
    const { newGameName, gameId } = req.body;
    await pool.query('UPDATE games SET name = $1 WHERE game_id = $2', [
      newGameName,
      gameId,
    ]);
    res.json('Successfully updated game name');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
