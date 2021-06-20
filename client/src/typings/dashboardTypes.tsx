import { IUser } from "./userTypes";
import {
    DASHBOARD_SET_USERNAME,
    DASHBOARD_SET_ACTIVE_USERS,
    DASHBOARD_SET_GROUP_CALL_ROOMS
} from 'constants/index';

export interface dashboardState {
    username: string
    activeUsers: IUser[]
    groupCallRooms: any
}

type setUsernameAction = {
    type: typeof DASHBOARD_SET_USERNAME
    username: string
}

type setActiveUsersAction = {
    type: typeof DASHBOARD_SET_ACTIVE_USERS
    activeUsers: IUser[]
}

type setGroupCalls = {
    type: typeof DASHBOARD_SET_GROUP_CALL_ROOMS
    groupCallRooms: any
}

export type dashboardActions = setUsernameAction | setActiveUsersAction | setGroupCalls;