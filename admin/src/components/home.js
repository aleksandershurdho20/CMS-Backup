import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class home extends Component {
  render() {
    return (
      <div className="my-5 w-100 text-center">
        <h3 className="">Please sign in</h3>
        <Link to="/admin/signin">Signin</Link>
      </div>
    );
  }
}

export default home;
