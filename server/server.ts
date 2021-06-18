import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { initSocketServer } from './socketServer';
import { ExpressPeerServer } from 'peer';

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

// setting up peer server
const options: any = {
    debug: true,
    allow_discovery: true
}
export const peerServer = ExpressPeerServer(server, options);

// connecting to socket
initSocketServer(server);