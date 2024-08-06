"use client";

import React, { FC, useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@/lib/graphql-mutation';
import { Logo } from '../logo';
import { useRouter } from 'next/navigation';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await login({ variables: { email, password } });
      const token = result.data.login.access_token;
      const _id = result.data.login._id;
      localStorage.setItem('token', token);
      localStorage.setItem('_id', _id);
      router.push('/');
    } catch (e) {
      console.error('Login failed:', e);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Logo />
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              href="#"
              variant="body2"
              sx={{ float: 'right', mt: 1 }}
              underline="none"
            >
              Forgot password?
            </Link>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Login
            </Button>
            {error && <Typography color="error">{error.message}</Typography>}
            <Typography variant="body2" align="center">
              Do not have an account?{' '}
              <Link href="/register" variant="body2" underline="none">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
