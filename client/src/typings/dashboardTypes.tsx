export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME';

export interface dashboardState {
    username: string
}

interface setUsernamAction {
    type: typeof DASHBOARD_SET_USERNAME
    username: string
}

export type dashboardActions =  setUsernamAction;