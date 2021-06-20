import { dashboardState, dashboardActions } from '../../typings/dashboardTypes';
import {
  DASHBOARD_SET_USERNAME,
  DASHBOARD_SET_ACTIVE_USERS,
  DASHBOARD_SET_GROUP_CALL_ROOMS
} from 'constants/index';

const initState: dashboardState = {
  username: '',
  activeUsers: [],
  groupCallRooms: []
};

const DashboardReducer = (state = initState, action: dashboardActions) => {
  switch (action.type) {
    case DASHBOARD_SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case DASHBOARD_SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.activeUsers
      };
    case DASHBOARD_SET_GROUP_CALL_ROOMS:
      return {
        ...state,
        groupCallRooms: action.groupCallRooms
      };
    default:
      return state;
  }
}
  ;

export default DashboardReducer;
