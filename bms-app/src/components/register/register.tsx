"use client";

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '@/lib/graphql-mutation';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { Logo } from '../logo';
import { useRouter } from 'next/navigation';

const Register = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await register({
        variables: {
          createUserInput: {
            firstName,
            lastName,
            email,
            password,
          },
        },
      });

      router.push('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Container component="main" maxWidth="md">
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
          <Typography component="h1" variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
            Register with
          </Typography>
          <Logo />
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Please fill in this form to create an account.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: '80%' }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
              }}
            >
              Build Your Store
            </Button>
            {error && <Typography color="error">{error.message}</Typography>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;