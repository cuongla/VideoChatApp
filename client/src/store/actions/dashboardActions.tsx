import { DASHBOARD_SET_USERNAME } from 'typings/dashboardTypes';

export const setUsername = (username: string) => {
    return {
      type: DASHBOARD_SET_USERNAME,
      username
    };
  }
  ;
  