import React, { useContext } from 'react';
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
import UserProvider from './contexts/UserProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const PrivateRoute = ({ children, ...rest }) => {
  const userData = useContext(UserProvider.context);
  if (userData) {
    console.log('user data available, going GAMES');
    return <Route {...rest} render={({ location }) => children}></Route>;
  }
  console.log('user data not available, going LOGIN');
  return <Redirect to="/login"></Redirect>;
};

const PublicRoute = ({ children, ...rest }) => {
  const userData = useContext(UserProvider.context);
  if (userData) {
    console.log('user data available, going GAMES');
    return <Redirect to="/games"></Redirect>;
  }
  console.log('user data not available, going route');
  return <Route {...rest} render={({ location }) => children}></Route>;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Login}></PublicRoute>
            <PublicRoute exact path="/login" component={Login}></PublicRoute>
            <Route path="/register" component={Register}></Route>
            <PrivateRoute path="/games" component={Games}></PrivateRoute>
          </Switch>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
