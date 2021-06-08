import { Server, Socket } from 'socket.io';
import { UserData } from './interfaces';

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

        socket.on('addNewUser', (data: UserData) => {
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
    });
}

