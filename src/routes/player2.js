const express = require('express');
const player2Router = express.Router();
const { data, handleAutomaticScore } = require('../services/data');
const socketio = require('../socketio');

player2Router.post('/name', (req, res) => {
  console.log('POST /player2/name', req.body);
  data.player2.name = req.body.value;
  res.json(data);
});

player2Router.post('/score', (req, res) => {
  console.log('POST /player2/score', req.body);
  data.player2.score = req.body.value;
  res.json(data);
});

player2Router.post('/score/plus', (req, res) => {
  console.log('POST /player2/score/plus');
  data.player2.score += 1;

  handleAutomaticScore();

  socketio.getIO().emit('data', data);

  res.json(data);
});

player2Router.post('/score/minus', (req, res) => {
  console.log('POST /player2/score/minus');
  if (data.player2.score >= 1) {
    data.player2.score -= 1;
  }

  handleAutomaticScore();

  socketio.getIO().emit('data', data);

  res.json(data);
});

player2Router.post('/sets', (req, res) => {
  console.log('POST /player2/sets', req.body);
  data.player2.sets = req.body.value;
  res.json(data);
});

player2Router.post('/sets/plus', (req, res) => {
  console.log('POST /player2/sets/plus');
  data.player2.sets += 1;
  res.json(data);
});

player2Router.post('/sets/minus', (req, res) => {
  console.log('POST /player2/sets/minus');
  if (data.player2.sets >= 1) {
    data.player2.sets -= 1;
  }
  res.json(data);
});

module.exports = player2Router;