import { store } from "store";
import { setActiveUsers } from 'store/actions/dashboardActions';
import { IUser } from "typings/userTypes";
import { socket } from './wssConnect';

const ACTIVE_USERS = 'ACTIVE_USERS';
const GROUP_CALL_ROOMS =  'GROUP_CALL_ROOMS';


export const handleBroadcastEvents = (data: any) => {
    console.log(data);
    switch(data.event) {
        case ACTIVE_USERS:
            // @ts-ignore
            const activeUsers = data.activeUsers.filter((activeUser: IUser) => activeUser.socketId !== socket.id);
            console.log(socket.id)
            // @ts-ignore
            store.dispatch(setActiveUsers(activeUsers));
            break;
        default:
            break;
    }
}