import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class signin extends Component {
  state = {
    width: '40%',

    email: '',
    password: '',
  };

  updateDimensions = () => {
    window.innerWidth > 678 ? this.setState({ width: '40%' }) : this.setState({ width: '75%' });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  componentDidMount = () => {
    window.innerWidth > 678 ? this.setState({ width: '40%' }) : this.setState({ width: '75%' });
    window.addEventListener('resize', () => {
      this.updateDimensions();
    });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <React.Fragment>
        <form
          onSubmit={(e) => this.handleSubmit(e)}
          className=" mx-auto my-5"
          style={{ width: window.innerWidth > 678 ? '40%' : '75%' }}
        >
          <h2 className="text-center">Sign in</h2>

          <div>
            <input
              className="form-control my-2"
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div>
            <input
              className="form-control my-2"
              type="text"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-sm btn-primary">
              Sign in
            </button>
          </div>
          <div className="text-center small my-2">
            No Account? <Link to="/admin/signup">Create here</Link>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default signin;
