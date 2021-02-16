import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      data: { username, password },
      withCredentials: true,
      url: 'http://localhost:5000/auth/register',
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Register</h1>
      <form onSubmit={handleRegister}>
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
    </Fragment>
  );
};

export default Register;
