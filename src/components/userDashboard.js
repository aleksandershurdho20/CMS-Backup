import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { removeAuth, checkAuth } from '../redux_2/actions/authActions';
import Loader from './loader';
// import { isAuthenticated, removeAuth } from '../utils/auth';

class userDashboard extends Component {
  state = {
    users: [],
    fetchedUser: {},
    updateState: 0,
    viewState: 0,
    deleteLoader: 0,
    deleteId: '',

    id: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    address: '',
  };

  toggleUpdate = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        updateState: !prevState.updateState,
      };
    });
  };

  toggleView = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        viewState: !prevState.viewState,
      };
    });
  };

  async componentDidMount() {
    // const { user, token } = isAuthenticated();
    // const authorized = isAuthenticated();
    // console.log(authorized);

    this.props.check_auth();
    const { user, token, isAuthenticated } = this.props;
    console.log('THIS IS FROM REDUX', user, isAuthenticated, token);
    if (!isAuthenticated) {
      this.props.history.push('/signin');
      return;
    }
    const res = await axios.get('/api/user', {
      headers: {
        authorization: token,
      },
    });
    this.setState({ fetchedUser: res.data.user });
    // console.log(this.state.fetchedUser);
  }

  logout = () => {
    // removeAuth();
    this.props.remove_auth();
    this.props.history.push('/signin');
  };

  handleUpdateChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    const id = this.state.fetchedUser.id;
    const { name, lastname, email, phone, password, address } = this.state;
    await axios.put('/api/update', { id, name, lastname, email, phone, password, address });
    const res2 = await axios.get('/api/user');
    this.setState({ fetchedUser: res2.data.user });
    this.toggleUpdate();
  };

  handleViewUsers = async () => {
    console.log('THIS IS ID', this.state.fetchedUser.id);
    const res = await axios.get(`/api/view-all-users`);
    this.setState({ users: res.data.users, viewState: 1 });
    console.log(this.state.users);
  };

  handleDelete = async (id) => {
    this.setState({ deleteId: id, deleteLoader: 1 });
    await axios.put('/api/delete-user', { id });
    const res1 = await axios.get('/api/user');
    const res2 = await axios.get('/api/view-all-users');
    this.setState({ fetchedUser: res1.data.user, users: res2.data.users });
    this.setState({ deleteId: '', deleteLoader: 0 });
  };

  render() {
    const { users, fetchedUser, updateState, viewState, deleteLoader, deleteId } = this.state;
    const { name, lastname, email, phone, address, password } = this.state;
    console.log(fetchedUser);
    return (
      <div>
        <div className=" d-flex px-5 py-2 justify-content-between">
          <div className="d-flex">
            <h4 className="text-muted">User details</h4>
            {viewState ? (
              <button className="btn  btn-sm btn-primary ml-3" onClick={this.toggleView}>
                Hide users
              </button>
            ) : (
              <button className="btn  btn-sm btn-outline-primary ml-3" onClick={this.handleViewUsers}>
                view all users
              </button>
            )}
          </div>
          <div>
            {updateState ? (
              <button className="btn btn-sm btn-outline-secondary mr-2" onClick={this.toggleUpdate}>
                Cancel
              </button>
            ) : (
              <button className="btn btn-sm btn-secondary mr-2" onClick={this.toggleUpdate}>
                Update
              </button>
            )}

            <button className="btn btn-sm btn-danger" onClick={this.logout}>
              Logout
            </button>
          </div>
        </div>
        {!updateState && (
          <div className="row mx-4 p-3 border rounded bg-light">
            {Object.keys(fetchedUser).map((key) => {
              return (
                <div className="w-100 d-flex p-2" key={key}>
                  <div className="col-4">{key}</div>
                  <div className="col-8">{fetchedUser[key]}</div>
                </div>
              );
            })}
          </div>
        )}
        {!!updateState && (
          <div>
            <form onSubmit={(e) => this.handleUpdate(e)}>
              <div className="d-flex flex-column w-50 mx-auto my-5">
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={name}
                  onChange={(e) => this.handleUpdateChange(e)}
                  className="my-1 form-control  update-input"
                />
                <input
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  onChange={(e) => this.handleUpdateChange(e)}
                  className="my-1 form-control  update-input"
                  value={lastname}
                />
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={(e) => this.handleUpdateChange(e)}
                  className="my-1 form-control  update-input"
                  value={email}
                />
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  onChange={(e) => this.handleUpdateChange(e)}
                  className="my-1 form-control  update-input"
                  value={password}
                />
                <input
                  type="text"
                  placeholder="phone"
                  name="phone"
                  onChange={(e) => this.handleUpdateChange(e)}
                  className="my-1 form-control  update-input"
                  value={phone}
                />
                <input
                  type="text"
                  placeholder="address"
                  name="address"
                  onChange={(e) => this.handleUpdateChange(e)}
                  className="my-1 form-control update-input"
                  value={address}
                />
                <button className="btn btn-sm btn-secondary my-1">update</button>
              </div>
            </form>
          </div>
        )}
        {!!viewState && (
          <div className="mx-5">
            <hr />
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">lastname</th>
                  <th scope="col">email</th>
                  <th scope="col">password</th>
                  <th scope="col">phone</th>
                  <th scope="col">address</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>
                        {fetchedUser.id !== user.id && (
                          <button
                            className=" btn-sm btn-danger d-flex align-items-center"
                            onClick={() => this.handleDelete(user.id)}
                          >
                            <span className="mr-2"> Delete</span>
                            {deleteId === user.id && deleteLoader ? <Loader /> : null}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('STATE_IN_PROPS', state);
  console.log('STATE_IN_PROPS_USER', state.auth.user);
  console.log('STATE_IN_PROPS_ISAUTHENTICATED', state.auth.isAuthenticated);
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    check_auth: () => {
      dispatch(checkAuth());
    },
    remove_auth: () => {
      dispatch(removeAuth());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(userDashboard);
