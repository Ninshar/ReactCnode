import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import HeaderNav from './component/header-nav'

import App from './pages/App.js';
import Particulars from './pages/particulars.js';
import Login from './pages/login.js';
import NoMatch from './pages/nomatch.js';
// import './App.css';

const RootRouter = () => (
  <Router>
    <div className="App">
      <HeaderNav />
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/topic/:id" component={Particulars}/>
        <Route path="/login" component={Login}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)

export default RootRouter;
