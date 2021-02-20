import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Login from './components/Login';
import Register from './components/Register';
import Games from './components/Games/Games';
import Questions from './components/Questions/Questions';
import Play from './components/Play';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

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
