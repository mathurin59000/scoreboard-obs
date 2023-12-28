const express = require('express');
const resetRouter = express.Router();
const { data } = require('../services/data');
const socketio = require('../socketio');

resetRouter.post('/score', (req, res) => {
  console.log('POST /reset/score');
  data.player1.score = 0;
  data.player2.score = 0;

  socketio.getIO().emit('data', data);

  res.json(data);
});

resetRouter.post('/match', (req, res) => {
  console.log('POST /reset/match');
  data.player1.sets = 0;
  data.player2.sets = 0;
  data.player1.score = 0;
  data.player2.score = 0;
  data.score = '';

  socketio.getIO().emit('data', data);

  res.json(data);
});

module.exports = resetRouter;