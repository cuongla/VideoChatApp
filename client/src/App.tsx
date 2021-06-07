import { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';
import { useEffect } from 'react';
import { connectWithWebSocket } from 'utils/wssConnect';

const App: FC = () => {
  // connect to socket once window is loaded
  useEffect(() => {
    connectWithWebSocket();
  }, []);


  return (
    <Router>
      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
