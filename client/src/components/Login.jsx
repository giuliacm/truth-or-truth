import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      data: { username, password },
      withCredentials: true,
      url: 'http://localhost:5000/auth/login',
    })
      .then((res) => {
        console.log(res);
        window.location.href = '/games';
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/user',
    }).then((res) => console.log(res));
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="inputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        <button onClick={getUser} type="submit" className="btn btn-primary">
          get user
        </button>
      </div>
    </Fragment>
  );
};

export default Login;
