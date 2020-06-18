import React from 'react';
import { NavLink } from 'react-router-dom';

function navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Admin
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/signin">
                Signin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/adminDashboard">
                AdminDashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default navbar;
