const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require("socket.io");
const router = require('./src/routes');
const { data } = require('./src/services/data');
const socketio = require('./src/socketio');

const port = 3100;

const app = express();
const server = createServer(app);
socketio.init(server);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/pages/scoreboard/index.html'));
});

app.get('/matchs', (req, res) => {
  res.sendFile(join(__dirname, 'public/pages/matchs/matchs.html'));
});

app.use('/', router);

server.listen(port, () => {
  console.log(`Scoreboard api listening on port ${port}`);
});
