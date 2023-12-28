const { v4 } = require('uuid');

const SCORE_SEPARATOR = ' ';
const SETS_TO_WON_MATCH = 3;

const defaultValues = {
  player1: {
    name: 'Player 1',
    sets: 0,
    score: 0,
  },
  player2: {
    name: 'Player 2',
    sets: 0,
    score: 0,
  },
  score: '',
  matchsArchived: [],
};

let data = {
  ...defaultValues,
};

const handleMatchDone = () => {
  if (data.player1.sets < SETS_TO_WON_MATCH && data.player2.sets < SETS_TO_WON_MATCH) {
    return;
  }

  console.log('SAVING MATCH...');

  const matchToArchive = {
    id: v4(),
    player1Name: data.player1.name, 
    player2Name: data.player2.name,
    score: data.score,
  };
  data.matchsArchived.push(matchToArchive);

  data.player1.name = 'Player 1';
  data.player1.sets = 0;
  data.player2.name = 'Player 2';
  data.player2.sets = 0;
  data.score = '';
}

const handleAutomaticScore = () => {
  if (data.player1.score <= 10 && data.player2.score <= 10) {
    return;
  }

  if (Math.abs(data.player1.score - data.player2.score) < 2) {
    return;
  }

  if (data.player1.score - data.player2.score >= 2) {
    data.player1.sets += 1;
    const scoreArray = data.score ? data.score.split(SCORE_SEPARATOR) : [];
    scoreArray.push(`${data.player2.score}`);
    data.score = scoreArray.join(SCORE_SEPARATOR);
  } else if (data.player2.score - data.player1.score >= 2) {
    data.player2.sets += 1;
    const scoreArray = data.score ? data.score.split(SCORE_SEPARATOR) : [];
    scoreArray.push(`-${data.player1.score}`);
    data.score = scoreArray.join(SCORE_SEPARATOR);
  }

  handleMatchDone();

  // Reset scores
  data.player1.score = 0;
  data.player2.score = 0;
};

module.exports = {
  data,
  handleAutomaticScore,
};
