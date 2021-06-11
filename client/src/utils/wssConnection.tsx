import io, { Socket } from 'socket.io-client'
import { store } from 'store';
import { setActiveUsers } from 'store/actions/dashboardActions';
import { CallRequestData } from 'typings/callTypes';
import { IUser } from 'typings/userTypes';
import * as WebRTCHandler from './WebRTCLogic';


const ACTIVE_USERS = 'ACTIVE_USERS';
const GROUP_CALL_ROOMS = 'GROUP_CALL_ROOMS';

const serverUrl = 'http://localhost:5000';
let socket: Socket;


export const connectWithWebSocket = () => {
    socket = io(serverUrl);

    socket.on('connection', () => {
        console.log('succesfully connected with wss server');
        console.log(socket.id);
    });

    socket.on('broadcast', (data) => {
        handleBroadcastEvents(data);
    })

    socket.on('requesting-call', (data) => {
        WebRTCHandler.handlePreRequest(data);
    });

    socket.on('responding-call', (data) => {
        WebRTCHandler.handlePreResponse(data);
    });

    socket.on('connecting-caller', (data) => {
        WebRTCHandler.handleConnectingCaller(data);
    });

    socket.on('connecting-callee', (data) => {
        WebRTCHandler.handleConnectingCallee(data);
    });

    socket.on('handling-call-candidate', (data) => {
        WebRTCHandler.handleCandidate(data);
    });

    socket.on('hang-up-call', () => {
        WebRTCHandler.handleUserHangedUp();
    });
}

// add new user
export const addNewUser = (username: string) => {
    socket.emit('add-new-user', {
        username,
        socketId: socket.id
    })
}

// emitting events to server related with direct call
export const sendCallRequest = (data: CallRequestData) => {
    socket.emit('requesting-call', data);
};

export const sendCallResponse = (data: any) => {
    socket.emit('responding-call', data);
};

export const sendWebRTCOffer = (data: any) => {
    socket.emit('webRTC-offer', data);
};

export const connectingCallee = (data: any) => {
    socket.emit('connecting-callee', data);
};

export const connectingCaller = (data: any) => {
    socket.emit('connecting-caller', data);
};

export const handleWebRTCCandidate = (data: any) => {
    socket.emit('handling-call-candidate', data);
};

export const handleUserHangUp = (data: any) => {
    socket.emit('user-hanged-up', data);
};


const handleBroadcastEvents = (data: any) => {
    console.log(data);
    switch (data.event) {
        case ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter((activeUser: IUser) => activeUser.socketId !== socket.id);
            store.dispatch(setActiveUsers(activeUsers) as any);
            break;
        default:
            break;
    }
}