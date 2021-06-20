import { Dispatch } from 'react';
import { dashboardActions } from 'typings/dashboardTypes';
import {
  DASHBOARD_SET_ACTIVE_USERS,
  DASHBOARD_SET_USERNAME,
  DASHBOARD_SET_GROUP_CALL_ROOMS
} from 'constants/index';

export const setUsername = (username: string) => {
  return (dispatch: Dispatch<dashboardActions>) => {
    dispatch({
      type: DASHBOARD_SET_USERNAME,
      username
    });
  }
};

export const setActiveUsers = (activeUsers: any) => {
  return (dispatch: Dispatch<dashboardActions>) => {
    dispatch({
      type: DASHBOARD_SET_ACTIVE_USERS,
      activeUsers
    });
  }
};

export const setGroupCalls = (groupCallRooms: any) => {
  return {
    type: DASHBOARD_SET_GROUP_CALL_ROOMS,
    groupCallRooms
  };
}