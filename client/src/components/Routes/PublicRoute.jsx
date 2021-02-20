import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/user',
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
    return <Route {...rest} render={() => <Redirect to="/games" />} />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
