import express, { NextFunction, Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import SocketServer from './socketServer';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//production for deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// connecting to server
const PORT = 5000;
const server = app.listen(PORT, () => console.log(`Listning to port ${PORT}`));

// connecting to socket
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket: Socket) => SocketServer(socket));