const socketio = require('socket.io');
const { data } = require('./services/data');

let io;
module.exports = {
  init: (server) => {
    io = socketio(server);

    const onConnection = (socket) => {
      console.log('a user connected');
      socket.emit('data', data);
    
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    };
    
    io.on("connection", onConnection);

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Can't get io instance before calling .init()");
    }
    return io;
  }
}