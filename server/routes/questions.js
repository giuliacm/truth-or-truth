const express = require('express');
const router = express.Router();
const pool = require('../db');

// create a question
router.post('/', async (req, res) => {
  try {
    const { description, userId, gameId } = req.body;
    const newQuestion = await pool.query(
      'INSERT INTO questions (description, game_id, user_id) VALUES($1, $2, $3) RETURNING *',
      [description, gameId, userId]
    );
    res.json(newQuestion.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

// get all questions for given game
router.get('/', async (req, res) => {
  try {
    const allQuestions = await pool.query(
      'SELECT * FROM questions WHERE game_id = $1',
      [req.query.gameId]
    );
    res.json(allQuestions.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

// delete a question, and permissions
router.delete('/', async (req, res) => {
  try {
    const { questionId } = req.body;
    await pool.query('DELETE FROM questions WHERE question_id = $1', [
      questionId,
    ]);
    res.json('Successfully deleted question');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

// update question description
router.put('/', async (req, res) => {
  try {
    const { newDescription, questionId } = req.body;
    await pool.query(
      'UPDATE questions SET description = $1 WHERE question_id = $2',
      [newDescription, questionId]
    );
    res.json('question description updated');
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
