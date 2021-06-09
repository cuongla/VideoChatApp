import { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import DashboardPage from 'pages/DashboardPage';
import LoginPage from 'pages/LoginPage';
import { useEffect } from 'react';
import { connectWithWebSocket } from 'utils/wssConnection';

const App: FC = () => {
  // connect to socket once window is loaded
  useEffect(() => {
    connectWithWebSocket();
  }, []);


  return (
    <Router>
      <Switch>
        <Route path='/dashboard'>
          <DashboardPage />
        </Route>
        <Route path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
