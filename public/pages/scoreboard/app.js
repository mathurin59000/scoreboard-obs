const socket = io();

let matchsArchived = [];

const options = {
  manual: false,
};

let matchScore = '';

let team1Score = 0;
let team2Score = 0;

const player1 = {
  name: 'Player 1',
  sets: 0,
  score: 0,
};

const player2 = {
  name: 'Player 2',
  sets: 0,
  score: 0,
};

let isConnected = false;

/** Define all inputs */
const optionManualInput = document.getElementById('options-manual');
const player1NameInput = document.getElementById('player1-input-name');
const player1SetsInput = document.getElementById('player1-input-sets');
const player1ScoreInput = document.getElementById('player1-input-score');
const player2NameInput = document.getElementById('player2-input-name');
const player2SetsInput = document.getElementById('player2-input-sets');
const player2ScoreInput = document.getElementById('player2-input-score');
const matchScoreInput = document.getElementById('match-score');

const player1Name = document.getElementById('player1-name');
const player1Sets = document.getElementById('player1-sets');
const player1Score = document.getElementById('player1-score');
const player2Name = document.getElementById('player2-name');
const player2Sets = document.getElementById('player2-sets');
const player2Score = document.getElementById('player2-score');

const matchTeamScore = document.getElementById('match-team-score');

const archiveMatchButton = document.getElementById('archive-match-button');

const initData = (data) => {
  if (data) {
    player1.name = data.player1.name;
    player1.sets = data.player1.sets;
    player1.score = data.player1.score;
    player2.name = data.player2.name;
    player2.sets = data.player2.sets;
    player2.score = data.player2.score;
    matchScore = data.score;
    matchsArchived = data.matchsArchived;

    // Global match score
    team1Score = 0;
    team2Score = 0;
    data.matchsArchived.forEach(({ score }) => {
      const sets = score.split(' ');
      let setsWonByPlayer1 = 0;
      let setsWonByPlayer2 = 0;
      sets.forEach((setScore) => {
        if (!setScore.includes('-')) {
          setsWonByPlayer1 += 1;
        } else {
          setsWonByPlayer2 += 1;
        }
      });
      if (setsWonByPlayer1 > setsWonByPlayer2) {
        team1Score += 1;
      } else {
        team2Score += 1;
      }
    });

    player1NameInput.value = data.player1.name;
    player1SetsInput.value = data.player1.sets;
    player1ScoreInput.value = data.player1.score;
    player2NameInput.value = data.player2.name;
    player2SetsInput.value = data.player2.sets;
    player2ScoreInput.value = data.player2.score;
    matchScoreInput.value = data.score;
  } else {
    player1.name = 'Player 1';
    player1.sets = 0;
    player1.score = 0;
    player2.name = 'Player 2';
    player2.sets = 0;
    player2.score = 0;
    matchScore = '';

    player1NameInput.value = 'Player 1';
    player1SetsInput.value = 0;
    player1ScoreInput.value = 0;
    player2NameInput.value = 'Player 2';
    player2SetsInput.value = 0;
    player2ScoreInput.value = 0;
    matchScoreInput = '';
  }
}

const handleNewData = (data) => {
  console.log(data)
  if (data) {
    isConnected = true;
  } else {
    isConnected = false;
  }

  initData(data);

  document.getElementById('status').innerHTML = isConnected ? 'Connected 🟢' : 'Disconnected 🔴';

  renderData();
}

const renderData = () => {
  player1Name.innerHTML = player1.name;
  player1Sets.innerHTML = player1.sets;
  player1Score.innerHTML = player1.score;

  player2Name.innerHTML = player2.name;
  player2Sets.innerHTML = player2.sets;
  player2Score.innerHTML = player2.score;

  matchTeamScore.innerHTML = `${team1Score} - ${team2Score}`
};

socket.on('data', (data) => {
  handleNewData(data);
});

optionManualInput.addEventListener("input", (e) => {
  console.log('Options - Manual', e.target.checked);
  const newValue = e.target.checked;
  if (newValue) {
    player1SetsInput.disabled = false;
    player2SetsInput.disabled = false;
    matchScoreInput.disabled = false;
    archiveMatchButton.disabled = false;
  } else {
    player1SetsInput.disabled = true;
    player2SetsInput.disabled = true;
    matchScoreInput.disabled = true;
    archiveMatchButton.disabled = true;
  }
});

matchScoreInput.addEventListener("input", (e) => {
  console.log('Match - score (oninput)', e.target.value);
  matchScore = e.target.value;
  renderData();
});

player1NameInput.addEventListener("input", async (e) => {
  console.log('Player 1 - name (oninput)', e.target.value);
  try {
    const response = await fetch('http://localhost:3100/player1/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: e.target.value,
      }),
    });
    const data = await response.json();
    player1.name = data.player1.name;
  } catch {
    player1.name = e.target.value;
  }
  renderData();
});

player2NameInput.addEventListener("input", async (e) => {
  console.log('Player 2 - name (oninput)', e.target.value);
  try {
    const response = await fetch('http://localhost:3100/player2/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: e.target.value,
      }),
    });
    const data = await response.json();
    player2.name = data.player2.name;
  } catch {
    player2.name = e.target.value;
  }
  renderData();
});

player1SetsInput.addEventListener("input", async (e) => {
  console.log('Player 1 - sets (oninput)', e.target.value);
  try {
    const response = await fetch('http://localhost:3100/player1/sets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: parseInt(e.target.value ?? 0),
      }),
    });
    const data = await response.json();
    player1.sets = data.player1.sets;
  } catch {
    player1.sets = e.target.value;
  }
  renderData();
});

player2SetsInput.addEventListener("input", async (e) => {
  console.log('Player 2 - sets (oninput)', e.target.value);
  try {
    const response = await fetch('http://localhost:3100/player2/sets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: parseInt(e.target.value ?? 0),
      }),
    });
    const data = await response.json();
    player2.sets = data.player2.sets;
  } catch {
    player2.sets = e.target.value;
  }
  renderData();
  renderData();
});

player1ScoreInput.addEventListener("input", async (e) => {
  console.log('Player 1 - score (oninput)', e.target.value);
  try {
    const response = await fetch('http://localhost:3100/player1/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: parseInt(e.target.value ?? 0),
      }),
    });
    const data = await response.json();
    player1.score = data.player1.score;
  } catch {
    player1.score = e.target.value;
  }
  renderData();
});

player2ScoreInput.addEventListener("input", async (e) => {
  console.log('Player 2 - score (oninput)', e.target.value);
  try {
    const response = await fetch('http://localhost:3100/player2/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: parseInt(e.target.value ?? 0),
      }),
    });
    const data = await response.json();
    player2.score = data.player2.score;
  } catch {
    player2.score = e.target.value;
  }
  renderData();
});

const resetMatch = async () => {
  console.log('Reset match');
  try {
    const response = await fetch('http://localhost:3100/reset/match', {
      method: 'POST',
    });
    const data = await response.json();
    player1.name = data.player1.name;
    player2.name = data.player2.name;
    player1.sets = data.player1.sets;
    player2.sets = data.player2.sets;
    player1.score = data.player1.score;
    player2.score = data.player2.score;

    player1NameInput.value = data.player1.name;
    player2NameInput.value = data.player2.name;
    player1SetsInput.value = data.player1.sets;
    player1ScoreInput.value = data.player1.score;
    player2SetsInput.value = data.player2.sets;
    player2ScoreInput.value = data.player2.score;
  } catch {
    player1.name = 'Player 1';
    player2.name = 'Player 2';
    player1.sets = 0;
    player2.sets = 0;
    player1.score = 0;
    player2.score = 0;

    player1SetsInput.value = 0;
    player1ScoreInput.value = 0;
    player2SetsInput.value = 0;
    player2ScoreInput.value = 0;
  }
  renderData();
};

const resetScores = async () => {
  console.log('Reset scores');
  try {
    const response = await fetch('http://localhost:3100/reset/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    player1.score = data.player1.score;
    player2.score = data.player2.score;

    player1ScoreInput.value = data.player1.score;
    player2ScoreInput.value = data.player2.score;
  } catch {
    player1.score = 0;
    player2.score = 0;

    player1ScoreInput.value = 0;
    player2ScoreInput.value = 0;
  }
  renderData();
};

const archiveMatch = async () => {
  console.log('Archiving current match...');
  try {
    const response = await fetch('http://localhost:3100/matchs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player1Name: player1.name,
        player2Name: player2.name,
        score: matchScore,
      }),
    });
    const newMatchsArchived = await response.json();
    matchsArchived = newMatchsArchived;
    newMatchsArchived.forEach(({ score }) => {
      const sets = score.split(' ');
      let setsWonByPlayer1 = 0;
      let setsWonByPlayer2 = 0;
      sets.forEach((setScore) => {
        if (!setScore.includes('-')) {
          setsWonByPlayer1 += 1;
        } else {
          setsWonByPlayer2 += 1;
        }
      });
      if (setsWonByPlayer1 > setsWonByPlayer2) {
        team1Score += 1;
      } else {
        team2Score += 1;
      }
    });
    await resetMatch();
  } catch (errorArchivingMatch) {
    console.debug(errorArchivingMatch);
  }
  renderData();
};
