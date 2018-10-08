import io from 'socket.io-client'

var socket = io('http://localhost:3000');
document.addEventListener('click', function() {
  socket.emit('chat message', `
    HELLO
  `);
})