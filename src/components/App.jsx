import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Room from './channels/Room';
import Channels from './channels/Channels';
import generateNickName from '../utils/nickNameGenerator';

const App = (props) => {
  document.cookie = generateNickName();
  return (
    <Router>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Switch>
          <Route exact path="/">
            <Channels gon={props} />
          </Route>
          <Route exact path="/api/v1/channels/:id" component={Room} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
