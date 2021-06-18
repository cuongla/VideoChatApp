import { Server, Socket } from 'socket.io';
import { UserData, RequestCallData, GroupCallData, IGroupRoom } from './interfaces';
import { uuid } from 'uuidv4';
import { peerServer } from './server';
import { createPeerServerListeners } from './groupCallHandler';

export const initSocketServer = (server: any) => {
    // setting group call 
    createPeerServerListeners(peerServer);

    // setting socket.io
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    // peers
    let peers: UserData[] = [];
    let groupCallRooms: IGroupRoom[] = [];

    // broadcast types
    const broadcastEventTypes = {
        ACTIVE_USERS: 'ACTIVE_USERS',
        GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
    }

    io.on('connection', (socket: Socket) => {
        socket.emit('connection', null);
        console.log('Connecting to socket.io');
        console.log(socket.id);

        socket.on('add-new-user', (data: UserData) => {
            peers.push({
                username: data.username,
                socketId: data.socketId
            });
            console.log('New user is added');

            // handling live users being online
            io.sockets.emit('broadcast', {
                event: broadcastEventTypes.ACTIVE_USERS,
                activeUsers: peers
            });
            console.log(`${peers.length} people in the app`);

            // handling live group call
            io.sockets.emit('broadcast', {
                event: broadcastEventTypes.GROUP_CALL_ROOMS,
                groupCallRooms
            });
            console.log(groupCallRooms);
        });

        socket.on('disconnect', () => {
            console.log('User is disconnected');
            peers = peers.filter(peer => peer.socketId !== socket.id);

            // update people list on live
            io.sockets.emit('broadcast', {
                event: broadcastEventTypes.ACTIVE_USERS,
                activeUsers: peers
            });

            // update group call rooms once user is disconnected
            groupCallRooms = groupCallRooms.filter(room => room.socketId !== socket.id);
            io.sockets.emit('broadcast', {
                event: broadcastEventTypes.GROUP_CALL_ROOMS,
                groupCallRooms
            });
        });

        /* ========== 1 ON 1 CALL ==========  */
        // sending a request for call
        socket.on('requesting-call', (data: RequestCallData) => {
            console.log('Sending call request to receiver');
            io.to(data.callee.socketId).emit('requesting-call', {
                callerUsername: data.caller.username,
                callerSocketId: socket.id
            });
        });

        // callee send the response back to caller
        socket.on('responding-call', (data: RequestCallData) => {
            console.log('Responding to call');
            io.to(data.callerSocketId as string).emit('responding-call', {
                answer: data.answer
            });
        });

        // handling request signal 
        socket.on('WebRTC-requesting', (data) => {
            console.log('Connecting to caller');
            io.to(data.calleeSocketId).emit('WebRTC-requesting', {
                offer: data.offer
            });
        });

        // handling reponses signal
        socket.on('WebRTC-responding', (data) => {
            console.log('Rejecting or Accepting call request from caller');
            io.to(data.callerSocketId).emit('WebRTC-responding', {
                answer: data.answer
            });
        });

        // handling live call
        socket.on('handling-ice', (data) => {
            console.log('ICE candidates');
            io.to(data.connectedUserSocketId).emit('handling-ice', {
                candidate: data.candidate
            });
        });

        // handling user hanged up call 
        socket.on('user-hanged-up', (data) => {
            console.log('User hanged up call')
            io.to(data.connectedUserSocketId).emit('user-hanged-up');
        });

        /* ========== GROUP CALL ==========  */
        // create group call
        socket.on('group-call-create', (data: GroupCallData) => {
            const roomId = uuid();
            socket.join(roomId);

            // new group room
            const newGroupCallRoom: IGroupRoom = {
                peerId: data.peerId,
                hostName: data.username,
                socketId: socket.id,
                roomId
            };

            // update group call rooms list
            groupCallRooms.push(newGroupCallRoom);
            io.sockets.emit('broadcast', {
                event: broadcastEventTypes.GROUP_CALL_ROOMS,
                groupCallRooms
            });
        });

        // requesting to join group call 
        socket.on('group-call-join-request', (data: GroupCallData) => {
            io.to(data.roomId).emit('grgroup-call-join-request', {
                peerId: data.peerId,
                streamId: data.streamId
            });

            socket.join(data.roomId);
        });

        // leaving group call
        socket.on('group-call-user-leave', (data: GroupCallData) => {
            socket.leave(data.roomId);

            io.to(data.roomId).emit('group-call-user-leave', {
                streamId: data.streamId
            });
        });

        // group room is closed by host
        socket.on('group-call-closed-by-host', (data: GroupCallData) => {
            // remove group room from list
            groupCallRooms = groupCallRooms.filter(room => room.peerId !== data.peerId);

            io.sockets.emit('broadcast', {
                event: broadcastEventTypes.GROUP_CALL_ROOMS,
                groupCallRooms
            });
        });
    });
}

