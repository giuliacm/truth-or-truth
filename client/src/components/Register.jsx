import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Link,
  Typography,
  Grid,
  Container,
} from '@material-ui/core';
import '@fontsource/paytone-one';

const useStyles = makeStyles((theme) => ({
  register: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Paytone One',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);

  const isPasswordMatching = () => {
    return password === password2;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isPasswordMatching()) {
      setError('Passwords do not match');
    } else {
      axios({
        method: 'post',
        data: { username, password },
        withCredentials: true,
        url: 'http://localhost:5000/auth/register',
      })
        .then((res) => {
          setError('');
          window.location.href = '/';
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Typography component="h2" variant="h1" className={classes.register}>
        Truth or Truth
      </Typography>
      <Container component="main" maxWidth="xs">
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleRegister}
        >
          {error && (
            <Typography component="h1" variant="h6" color="error">
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
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Re-enter Password"
            type="password"
            id="password2"
            onChange={(e) => setPassword2(e.target.value)}
            error={!!error}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login">{'Already have an account? Log In'}</Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Container>
  );
};

export default Register;
