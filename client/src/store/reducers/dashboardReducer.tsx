import { 
    dashboardState,
    dashboardActions,
    DASHBOARD_SET_USERNAME 
} from '../../typings/dashboardTypes';

const initState: dashboardState = {
  username: ''
};

const reducer = (state = initState, action: dashboardActions) => {
  switch (action.type) {
    case DASHBOARD_SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
}
;

export default reducer;
