import { IUser } from "./userTypes";
import {
    DASHBOARD_SET_USERNAME,
    DASHBOARD_SET_ACTIVE_USERS
} from 'constants/index';

export interface dashboardState {
    username: string
    activeUsers: IUser[]
}

type setUsernameAction = {
    type: typeof DASHBOARD_SET_USERNAME
    username: string
}

type setActiveUsersAction = {
    type: typeof DASHBOARD_SET_ACTIVE_USERS
    activeUsers: IUser[]
}

export type dashboardActions =  setUsernameAction | setActiveUsersAction;