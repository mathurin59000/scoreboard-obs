const express = require('express');
const resetRouter = require('./reset');
const player1Router = require('./player1');
const player2Router = require('./player2');
const matchRouter = require('./match');

const router = express.Router();

router.use('/player1', player1Router);
router.use('/player2', player2Router);
router.use('/matchs', matchRouter);
router.use('/reset', resetRouter);

module.exports = router;
