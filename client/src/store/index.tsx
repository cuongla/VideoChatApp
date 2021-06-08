import { createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof rootReducers>

