import React from 'react';
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
// import { setAuth } from './utils/auth';
import { setAuth } from './redux_2/actions/authActions';
import { connect } from 'react-redux';

class SignIn extends React.Component {
  state = {
    email: 'brad@brad.com',
    password: 'key',

    alert: false,
    alertMesage: '',
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    try {
      const res = await axios.post('/api/login', { email, password });
      if (!email.length || !password.length) {
        this.setState({ alert: true, alertMessage: '*All fields are required' });
        return;
      }
      this.setState({ alert: true, alertMessage: res.data.msg });
      console.log(res);
      // for utils
      // setAuth(res.data.token);
      // for reducers
      this.props.setAuth(res.data.token);
      //
      this.props.history.push('/userDashboard');
    } catch (err) {
      this.setState({ alert: true, alertMessage: err.message });
    }
  };
  render() {
    const { email, password } = this.state;
    const { alert, alertMessage } = this.state;
    return (
      <div className="mt-4">
        <ReactBootstrap.Container>
          {!!alert && <div style={{ fontWeight: 'bold' }}>{alertMessage}</div>}
          <ReactBootstrap.Form onSubmit={(e) => this.handleSubmit(e)}>
            <ReactBootstrap.Form.Group controlId="formBasicEmail">
              <ReactBootstrap.Form.Label>Email address</ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => this.handleChange(e)}
              />
              <ReactBootstrap.Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </ReactBootstrap.Form.Text>
            </ReactBootstrap.Form.Group>

            <ReactBootstrap.Form.Group controlId="formBasicPassword">
              <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => this.handleChange(e)}
              />
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group controlId="formBasicCheckbox">
              <ReactBootstrap.Form.Check type="checkbox" label="Check me out" />
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Button variant="primary" type="submit">
              Submit
            </ReactBootstrap.Button>
          </ReactBootstrap.Form>
        </ReactBootstrap.Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (token) => {
      dispatch(setAuth(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
