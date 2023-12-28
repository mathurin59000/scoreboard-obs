const express = require('express');
const matchRouter = express.Router();
const { v4 } = require('uuid');
const { data } = require('../services/data');

matchRouter.get('/', (req, res) => {
  console.log('GET /matchs');
  res.json(data.matchsArchived);
});

matchRouter.post('/', (req, res) => {
  console.log('POST /matchs', req.body);
  const matchToArchive = {
    id: v4(),
    player1Name: req.body.player1Name, 
    player2Name: req.body.player2Name,
    score: req.body.score,
  };
  data.matchsArchived.push(matchToArchive);
  res.json(data.matchsArchived);
});

matchRouter.delete('/:id', (req, res) => {
  console.log(`DELETE /matchs/${req.params.id}`);
  const matchIndexToDelete = data.matchsArchived.findIndex(({ id }) => id === req.params.id);
  if (matchIndexToDelete > -1) {
    data.matchsArchived.splice(matchIndexToDelete, 1);
  }

  res.json(data.matchsArchived);
});

module.exports = matchRouter;