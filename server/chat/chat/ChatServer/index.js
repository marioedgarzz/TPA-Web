var io = require('socket.io')(1000);

console.log('Server Started');

io.on('connection', function(socket) {
    console.log('User Connected');
    socket.on('chat', function(msg) {
        io.emit('chat', msg);
    });
});

