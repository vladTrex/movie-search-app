import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import 'typeface-roboto';

import '../dist/style.css';
import HomeScreen from './components/Home';

const App = () => {
  return <Router>
    <Switch>
      <Route exact path="/" replace component={HomeScreen}/>
    </Switch>
  </Router>
};

ReactDOM.render(<App />, document.getElementById('root-element'));

