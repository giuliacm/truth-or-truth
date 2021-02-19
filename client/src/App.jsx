import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Games from './components/Games';
import Questions from './components/Questions';
import Play from './components/Play';
import UserProvider from './contexts/UserProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  // const userData = useContext(UserProvider.context);

  useEffect(() => {
    console.log('STARTING USER CALL');
    setIsLoading(true);
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/user',
    }).then((res) => {
      console.log('in user return');
      console.log(res);
      if (res.data) {
        setUserData(res.data);
        setIsLoading(false);
      } else {
        setUserData(false);
        setIsLoading(false);
      }
    });
  }, []);

  console.log(userData);
  console.log(isLoading);

  if (isLoading) {
    return <div />;
  } else {
    if (userData) {
      console.log(userData);
      console.log('user data available, going GAMES');
      return (
        <Route
          {...rest}
          render={(props) => <Component {...props} userData={userData} />}
        />
      );
    }

    console.log('user data not available, going LOGIN');
    return <Route {...rest} render={() => <Redirect to="/login" />} />;
  }
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  // const userData = useContext(UserProvider.context);

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

  console.log(userData);
  console.log(isLoading);

  if (userData) {
    console.log('user data available, going GAMES');
    return <Redirect to="/games" />;
  }
  if (isLoading) {
    return <div />;
  }
  console.log('user data not available, going route');
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <UserProvider> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <PrivateRoute path="/games" component={Games}></PrivateRoute>
          <PrivateRoute path="/questions" component={Questions}></PrivateRoute>
          <PrivateRoute path="/play" component={Play}></PrivateRoute>
        </Switch>
      </Router>
      {/* </UserProvider> */}
    </ThemeProvider>
  );
};

export default App;
