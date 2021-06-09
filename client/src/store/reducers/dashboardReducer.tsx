import { dashboardState, dashboardActions } from '../../typings/dashboardTypes';
import {
  DASHBOARD_SET_USERNAME,
  DASHBOARD_SET_ACTIVE_USERS
} from 'constants/index';

const initState: dashboardState = {
  username: '',
  activeUsers: []
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
      }
    default:
      return state;
  }
}
  ;

export default DashboardReducer;
