import * as ReactBootstrap from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import {registerUser} from './../redux/actions/authAction.js';
import { registerUser } from './redux/actions/AuthAction.js';
// import { setAuth } from './utils/auth';
import Form from 'react-bootstrap/Form';
// const RegisterForm = ({dispatchRegisterAction}) =>{

import { setAuth } from './redux_2/actions/authActions';
class RegisterForm extends React.Component {
  state = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    address: '',

    alert: false,
    alertMesage: '',
    success: false,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastname, email, password, phone, address } = this.state;
    // console.log(name, lastname, email, phone, password, address);
    try {
      const res = await axios.post('/api/signup', { name, lastname, email, password, phone, address });
      if (!name.length || !lastname.length || !email.length || !password.length || !phone.length || !address.length) {
        this.setState({ alert: true, alertMessage: '*All fields are required' });
        return;
      }
      this.setState({ alert: true, alertMessage: res.data.msg });
      if (res.data.success) {
        this.setState({ success: true });
      }
      console.log(res);
      // setAuth(res.data.token);
      this.props.set_auth(res.data.token);
    } catch (err) {
      this.setState({ alert: true, alertMessage: err.message });
    }
  };

  render() {
    const { name, lastname, email, password, phone, address } = this.state;
    const { alert, alertMessage, success } = this.state;
    return (
      <div className="m-4">
        {alert ? <div style={{ fontWeight: 'bold' }}>{alertMessage}</div> : null}
        {!!success && <Link to="/signin">Log in now</Link>}
        <ReactBootstrap.Row>
          <ReactBootstrap.Col lg={12} md={12}></ReactBootstrap.Col>
          <ReactBootstrap.Col lg={12} md={12}>
            <form noValidate onSubmit={(e) => this.handleSubmit(e)}>
              <ReactBootstrap.FormGroup>
                <ReactBootstrap.FormLabel>Name</ReactBootstrap.FormLabel>
                <ReactBootstrap.FormControl
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => this.handleChange(e)}
                />
              </ReactBootstrap.FormGroup>
              <ReactBootstrap.FormGroup>
                <ReactBootstrap.FormLabel>Lastname</ReactBootstrap.FormLabel>
                <ReactBootstrap.FormControl
                  type="text"
                  name="lastname"
                  placeholder="Enter lastname"
                  value={lastname}
                  onChange={(e) => this.handleChange(e)}
                />
              </ReactBootstrap.FormGroup>
              <ReactBootstrap.FormGroup>
                <ReactBootstrap.FormLabel>Phone</ReactBootstrap.FormLabel>
                <ReactBootstrap.FormControl
                  type="phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => this.handleChange(e)}
                />
              </ReactBootstrap.FormGroup>
              <ReactBootstrap.FormGroup>
                <ReactBootstrap.FormLabel>Password</ReactBootstrap.FormLabel>
                <ReactBootstrap.FormControl
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => this.handleChange(e)}
                />
              </ReactBootstrap.FormGroup>
              <ReactBootstrap.FormGroup>
                <ReactBootstrap.FormLabel>Email</ReactBootstrap.FormLabel>
                <ReactBootstrap.FormControl
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => this.handleChange(e)}
                />
              </ReactBootstrap.FormGroup>
              <ReactBootstrap.FormGroup>
                <ReactBootstrap.FormLabel>Adress</ReactBootstrap.FormLabel>
                <ReactBootstrap.FormControl
                  type="text"
                  name="address"
                  placeholder="Enter adress"
                  value={address}
                  onChange={(e) => this.handleChange(e)}
                />
              </ReactBootstrap.FormGroup>
              {/* <ReactBootstrap.Button value="submit" onClick={()=>handleSubmit}>Submit</ReactBootstrap.Button> */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {
  return {
    set_auth: (token) => {
      dispatch(setAuth(token));
    },
  };
};
// dispatchRegisterAction: (name, lastname, email, phone, password, adress, onSuccess, onError) =>
//   // dispatch(registerUser({firstname,lastname,email,phone,password,adress},onSuccess,onError))
//   dispatch(registerUser({ name, lastname, email, phone, password, adress }, onSuccess, onError)),

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
