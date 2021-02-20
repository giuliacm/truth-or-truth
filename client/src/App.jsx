import React, { useEffect, useState } from 'react';
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
import Games from './components/Games/Games';
import Questions from './components/Questions/Questions';
import Play from './components/Play';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const PrivateRoute = ({ component: Component, ...rest }) => {
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
    return (
      <Route
        {...rest}
        render={(props) => <Component {...props} userData={userData} />}
      />
    );
  }
  return <Route {...rest} render={() => <Redirect to="/login" />} />;
};

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login}></PublicRoute>
          <PublicRoute exact path="/login" component={Login}></PublicRoute>
          <PublicRoute path="/register" component={Register}></PublicRoute>
          <PrivateRoute path="/games" component={Games}></PrivateRoute>
          <PrivateRoute path="/questions" component={Questions}></PrivateRoute>
          <PrivateRoute path="/play" component={Play}></PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
