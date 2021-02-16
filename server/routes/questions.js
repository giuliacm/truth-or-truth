const express = require('express');
const router = express.Router();
const pool = require('../db');

// create a question
router.post('/', async (req, res) => {
  try {
    const { description, user_id, game_id } = req.body;
    const newQuestion = await pool.query(
      'INSERT INTO questions (description, game_id, user_id) VALUES($1, $2, $3) RETURNING *',
      [description, game_id, user_id]
    );
    res.json(newQuestion.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get all questions for given game
router.get('/', async (req, res) => {
  try {
    const { game_id } = req.body;
    const allQuestions = await pool.query(
      'SELECT * FROM questions WHERE game_id = $1',
      [game_id]
    );
    res.json(allQuestions.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// delete a question, and permissions
router.delete('/', async (req, res) => {
  try {
    const { question_id } = req.body;
    const deleteQuestion = await pool.query(
      'DELETE FROM questions WHERE question_id = $1',
      [question_id]
    );
    res.json('successfully deleted question');
  } catch (err) {
    console.log(err.message);
  }
});

// update question description
router.put('/', async (req, res) => {
  try {
    const { new_description, question_id } = req.body;
    const newDescription = await pool.query(
      'UPDATE questions SET description = $1 WHERE question_id = $2',
      [new_description, question_id]
    );
    res.json('question description updated');
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
