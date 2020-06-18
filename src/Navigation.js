import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import * as ReactBootstrap from 'react-bootstrap'
import { Navbar, Nav, Button } from 'react-bootstrap';
export class Navigation extends Component {
  render() {
    return (
      <div>
        <>
          <Navbar bg="secondary" variant="dark">
            <Navbar.Brand>
              <Link to="/" className="text-light">
                Crud
              </Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Link style={{ color: '#ccc' }} className="mx-2" to="/">
                Home
              </Link>
              <Link style={{ color: '#ccc' }} className="mx-2" to="/SignIn">
                SignIn
              </Link>
              <Link style={{ color: '#ccc' }} className="mx-2" to="/SignUp">
                SignUp
              </Link>
              <Link style={{ color: '#ccc' }} className="mx-2" to="/userDashboard">
                UserDashboard
              </Link>
            </Nav>
          </Navbar>
        </>
      </div>
    );
  }
}

export default Navigation;
