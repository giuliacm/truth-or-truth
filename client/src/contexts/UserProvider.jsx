import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // https://stackoverflow.com/questions/63401488/react-how-can-wait-until-api-call-finish-to-load-a-path
  useEffect(() => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/user',
    }).then((res) => {
      console.log('in user return');
      console.log(res);
      if (res.data) {
        setUser(res.data);
      } else {
        setUser(false);
      }
    });
  }, []);

  return <context.Provider value={user}>{children}</context.Provider>;
};

UserProvider.context = context;

export default UserProvider;
