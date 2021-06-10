import { Server, Socket } from 'socket.io';
import { UserData, RequestCallData } from './interfaces';

export const initSocketServer = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    // peers
    let peers: UserData[] = [];
    const broadcaseEventTypes = {
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

            // add new user to list
            io.sockets.emit('broadcast', {
                event: broadcaseEventTypes.ACTIVE_USERS,
                activeUsers: peers
            });
            console.log('New user is added');
            console.log(peers);
        });

        socket.on('disconnect', () => {
            console.log('User is disconnected');
            peers = peers.filter(peer => peer.socketId !== socket.id);

            // update user list
            io.sockets.emit('broadcast', {
                event: broadcaseEventTypes.ACTIVE_USERS,
                activeUsers: peers
            });
        });

        // requesting a call to a callee
        socket.on('requesting-call', (data: RequestCallData) => {
            console.log('Calleer is requesting a call with callee');
            io
                .to(data.callee.socketId)
                .emit('requesting-call', {
                    callerUsername: data.caller.username,
                    callerSocketId: socket.id
                });
        });

        // waiting for callee to accept the call
        socket.on('pre-connecting-callee', (data: RequestCallData) => {
            console.log('Waiting for callee to asnwer the call');
            io
                .to(data.callerSocketId as string)
                .emit('pre-connecting-callee', {
                    answer: data.answer
                });
        });

        // connecting to callee when callee accept the call
        socket.on('connecting-to-callee', (data) => {
            console.log('Handle webRCt for requesting a call');
            io
                .to(data.calleeSocketId)
                .emit('connecting-to-callee', {
                    offer: data.offer
                });
        });


        // connecting to caller when callee accept the call
        socket.on('connecting-to-caller', (data) => {
            console.log('Handle webRCt for answering a call');
            io
                .to(data.callerSocketId)
                .emit('connecting-to-caller', {
                    answer: data.answer
                });
        });

        socket.on('webRTC-candidate', (data) => {
            console.log('handling ice candidate');
            io
                .to(data.connectedUserSocketId)
                .emit('webRTC-candidate', {
                    candidate: data.candidate
                });
        });

        socket.on('user-hanged-up', (data) => {
            io
                .to(data.connectedUserSocketId)
                .emit('user-hanged-up');
        });
    });
}

