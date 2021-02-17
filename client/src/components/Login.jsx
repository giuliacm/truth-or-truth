import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  login: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        setError('');
        window.location.href = '/games';
      })
      .catch((err) => {
        console.log(err.response);
        // incorrect username or password
        setError(err.response.data);
      });
  };

  return (
    <Container component="main" maxWidth="xl">
      <Typography component="h2" variant="h1" className={classes.login}>
        Truth or Truth
      </Typography>
      <Container component="main" maxWidth="xs">
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleLogin}
        >
          {error && (
            <Typography component="h2" variant="h6" color="error">
              {error}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Container>
  );
};

export default Login;
