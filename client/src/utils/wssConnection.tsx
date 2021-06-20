import io, { Socket } from 'socket.io-client'
import { store } from 'store';
import { setActiveUsers, setGroupCalls } from 'store/actions/dashboardActions';
import { CallRequestData } from 'typings/callTypes';
import { IUser } from 'typings/userTypes';
import * as WebRTCHandler from './webRTC/WebRTCHandler';
import * as WebRTCGroupHandler from './webRTC/WebRTCGroupHandler';
import { dashboardActions } from 'typings/dashboardTypes';

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

    socket.on('WebRTC-requesting', (data) => {
        WebRTCHandler.handleRequest(data);
    });

    socket.on('WebRTC-responding', (data) => {
        WebRTCHandler.handleResponse(data);
    });

    socket.on('handling-ice', (data) => {
        WebRTCHandler.handleCandidate(data);
    });

    socket.on('user-hanged-up', () => {
        WebRTCHandler.handleUserHangedUp();
    });

    // listeners related with group calls
    socket.on('group-call-join-request', (data) => {
        WebRTCGroupHandler.connectToNewUser(data);
    });

    socket.on('group-call-user-left', (data) => {
        WebRTCGroupHandler.removeInactiveStream(data);
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

export const sendWebRTCRequest = (data: any) => {
    socket.emit('WebRTC-requesting', data);
};

export const sendWebRTCResponse = (data: any) => {
    socket.emit('WebRTC-responding', data);
};

export const handleWebRTCIce = (data: any) => {
    socket.emit('handling-ice', data);
};

export const sendUserHangedUp = (data: any) => {
    socket.emit('user-hanged-up', data);
};

// emitting events related with group calls
export const registerGroupCall = (data: any) => {
    socket.emit('group-call-create', data);
};

export const userWantsToJoinGroupCall = (data: any) => {
    socket.emit('group-call-join-request', data);
};

export const userLeftGroupCall = (data: any) => {
    socket.emit('group-call-user-leave', data);
};

export const groupCallClosedByHost = (data: any) => {
    socket.emit('group-call-closed-by-host', data);
};


const handleBroadcastEvents = (data: any) => {
    switch (data.event) {
        case ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter((activeUser: IUser) => activeUser.socketId !== socket.id);
            store.dispatch(setActiveUsers(activeUsers) as any);
            break;

        case GROUP_CALL_ROOMS:
            const groupCallRooms = data.groupCallRooms.filter((room: any) => room.socketId !== socket.id);
            const activeGroupCallRoomId = WebRTCGroupHandler.checkActiveGroupCall();

            if (activeGroupCallRoomId) {
                const room = groupCallRooms.find((room: any) => room.roomId === activeGroupCallRoomId);
                if (!room) {
                    WebRTCGroupHandler.clearGroupData();
                }
            }
            store.dispatch(setGroupCalls(groupCallRooms) as dashboardActions);
            break;

        default:
            break;
    }
}
