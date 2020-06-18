import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import AdminDashboard from './components/adminDashboard';
import Page404 from './components/404';

import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin/signin" component={Signin} />
          <Route exact path="/admin/signup" component={Signup} />
          <Route exact path="/admin/adminDashboard" component={AdminDashboard} />
          <Route exact path="/404" component={Page404} />
          <Redirect from="*" to="/404" />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
