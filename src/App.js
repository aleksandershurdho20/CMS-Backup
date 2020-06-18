import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../src/Home.js';
import SignIn from '../src/SignIn.js';
import SignUp from '../src/SignUp.js';
import Navigation from '../src/Navigation.js';
import UserDashboard from './components/userDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        {/* <SignIn/> */}
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/SignIn" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/userDashboard" component={UserDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
