import io from 'socket.io-client'
import { handleBroadcastEvents } from './socketFunctions';


const serverUrl = 'http://localhost:5000';
export let socket = io(serverUrl);

export const connectWithWebSocket = () => {
    socket.on('connection', () => {
        console.log('succesfully connected with wss server');
        console.log(socket.id);
    });

    socket.on('broadcast', (data) => {
        handleBroadcastEvents(data);
    })
}

export const addNewUser = (username: string) => {
    socket.emit('addNewUser', {
        username,
        socketId: socket.id
    })
}

