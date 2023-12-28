const express = require('express');
const player1Router = express.Router();
const { data, handleAutomaticScore } = require('../services/data');
const socketio = require('../socketio');

player1Router.post('/name', (req, res) => {
  console.log('POST /player1/name', req.body);
  data.player1.name = req.body.value;
  res.json(data);
});

player1Router.post('/score', (req, res) => {
  console.log('POST /player1/score', req.body);
  data.player1.score = req.body.value;
  res.json(data);
});

player1Router.post('/score/plus', (req, res) => {
  console.log('POST /player1/score/plus');
  data.player1.score += 1;

  handleAutomaticScore();

  socketio.getIO().emit('data', data);

  res.json(data);
});

player1Router.post('/score/minus', (req, res) => {
  console.log('POST /player1/score/minus');
  if (data.player1.score >= 1) {
    data.player1.score -= 1;
  }

  handleAutomaticScore();

  socketio.getIO().emit('data', data);

  res.json(data);
});

player1Router.post('/sets', (req, res) => {
  console.log('POST /player1/sets', req.body);
  data.player1.sets = req.body.value;
  res.json(data);
});

player1Router.post('/sets/plus', (req, res) => {
  console.log('POST /player1/sets/plus');
  data.player1.sets += 1;
  res.json(data);
});

player1Router.post('/sets/minus', (req, res) => {
  console.log('POST /player1/sets/minus');
  if (data.player1.sets >= 1) {
    data.player1.sets -= 1;
  }
  res.json(data);
});

module.exports = player1Router;