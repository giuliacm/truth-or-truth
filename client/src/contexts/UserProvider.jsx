import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const context = createContext(null);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // https://stackoverflow.com/questions/63401488/react-how-can-wait-until-api-call-finish-to-load-a-path
  useEffect(() => {
    console.log('STARTING USER CALL');
    setIsLoading(true);
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/user',
    }).then((res) => {
      setIsLoading(false);
      console.log('in user return');
      console.log(res);
      if (res.data) {
        setUserData(res.data);
      } else {
        setUserData(false);
      }
    });
  }, []);

  return (
    <context.Provider value={{ userData, isLoading }}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;
