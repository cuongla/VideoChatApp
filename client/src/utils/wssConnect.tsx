import io from 'socket.io-client'


const serverUrl = 'http://localhost:5000';
let socket = io(serverUrl);

export const connectWithWebSocket = () => {
    socket.on('connection', () => {
        console.log('succesfully connected with wss server');
        console.log(socket.id);
    });
}

export const addNewUser = (username: string) => {
    socket.emit('addNewUser', {
        username,
        socketId: socket.id
    })
}