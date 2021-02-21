import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      withCredentials: true,
      url: '/auth/user',
    }).then((res) => {
      if (res.data) {
        setUserData(res.data);
        setIsLoading(false);
      } else {
        setUserData(false);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <div />;
  }
  if (userData) {
    return (
      <Route
        {...rest}
        render={(props) => <Component {...props} userData={userData} />}
      />
    );
  }
  return <Route {...rest} render={() => <Redirect to="/login" />} />;
};

export default PrivateRoute;
