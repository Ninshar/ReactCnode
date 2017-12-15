import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import App from './pages/App.js';
import Particulars from './pages/particulars.js';

const RootRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/topic/:id" component={Particulars}/>
    </div>
  </Router>
)

export default RootRouter;
