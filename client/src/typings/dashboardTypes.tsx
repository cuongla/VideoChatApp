import { IUser } from "./userTypes";
import * as actionTypes from 'store/actions/types';

export interface dashboardState {
    username: string
    activeUsers: IUser[]
}

type setUsernameAction = {
    type: typeof actionTypes.DASHBOARD_SET_USERNAME
    username: string
}

type setActiveUsersAction = {
    type: typeof actionTypes.DASHBOARD_SET_ACTIVE_USERS
    activeUsers: IUser[]
}

export type dashboardActions =  setUsernameAction | setActiveUsersAction;