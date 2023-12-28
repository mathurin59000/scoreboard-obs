const socket = io();

let matchsArchived = [];

let isConnected = false;

const handleNewData = (data) => {
  matchsArchived = data.matchsArchived;
  if (data.matchsArchived) {
    isConnected = true;
  } else {
    isConnected = false;
  }

  renderData();
}

const renderData = () => {
  const listElement = document.getElementById('matchs-list');
  listElement.innerHTML = '';

  matchsArchived.forEach((_match) => {
    const listItemElement = document.createElement('li');
    listItemElement.classList.add('matchs-list-item');
    listItemElement.attributes.id = _match;

    const player1NameElement = document.createElement('div');
    player1NameElement.classList.add('matchs-list-item-player-1-name');
    player1NameElement.innerHTML = _match.player1Name;

    const player2NameElement = document.createElement('div');
    player2NameElement.classList.add('matchs-list-item-player-2-name');
    player2NameElement.innerHTML = _match.player2Name;

    const sets = _match.score.split(' ');
    const setsWonByPlayer1 = sets.filter((score) => !score.includes('-')).length ?? 0;
    const setsWonByPlayer2 = sets.filter((score) => score.includes('-')).length ?? 0;

    const player1ScoreElement = document.createElement('div');
    player1ScoreElement.classList.add('matchs-list-item-player-1-score');
    player1ScoreElement.innerHTML = setsWonByPlayer1;

    const player2ScoreElement = document.createElement('div');
    player2ScoreElement.classList.add('matchs-list-item-player-2-score');
    player2ScoreElement.innerHTML = setsWonByPlayer2;

    listItemElement.appendChild(player1NameElement);
    listItemElement.appendChild(player1ScoreElement);
    listItemElement.appendChild(player2ScoreElement);
    listItemElement.appendChild(player2NameElement);

    listElement.appendChild(listItemElement);
  });
};

socket.on('data', (data) => {
  console.log(data)
  handleNewData(data);
});

const deleteMatch = async (id) => {
  console.log('Delete match', id);
  try {
    const response = await fetch(`http://localhost:3100/matchs/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    matchsArchived = data;
  } catch {
    // nothing
  }
  renderData();
};
