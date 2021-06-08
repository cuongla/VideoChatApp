import { combineReducers } from 'redux';
import dashboard from './dashboardReducer';
import call from './callReducer';

export default combineReducers({
    dashboard,
    call
});