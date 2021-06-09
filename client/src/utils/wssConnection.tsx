import io from 'socket.io-client'
import { CallRequestData } from 'typings/callTypes';
import { handleBroadcastEvents } from './socketFunctions';
import { handleRequestCall } from './webRTCHandler';


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

    socket.on('requesting-call', (data) => {
        handleRequestCall(data);
    })
}

// add new user
export const addNewUser = (username: string) => {
    socket.emit('add-new-user', {
        username,
        socketId: socket.id
    })
}

// handling incoming call
export const sendCallRequest = (data: CallRequestData) => {
    socket.emit('requesting-call', data);
};

export const sendCallAnswer = (data: any) => {
    socket.emit('pre-answer-call', data);
};

