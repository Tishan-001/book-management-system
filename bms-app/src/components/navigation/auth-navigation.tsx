import React, { FC, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { StyledButton } from '@/components/styled-button';
import { useRouter } from 'next/navigation';

const AuthNavigation: FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
    setIsUserLoggedIn(false);
  };

  if (isUserLoggedIn) {
    return (
      <Box sx={{ '& button:first-child': { mr: 2 } }}>
        <Link href="/profile" passHref>
          <StyledButton disableHoverEffect={true} variant="outlined">
            Profile
          </StyledButton>
        </Link>
          <StyledButton disableHoverEffect={true} onClick={handleLogout}>
            Logout
          </StyledButton>
      </Box>
    );
  }

  return (
    <Box sx={{ '& button:first-child': { mr: 2 } }}>
      <Link href="/login" passHref>
        <StyledButton disableHoverEffect={true} variant="outlined">
          Sign In
        </StyledButton>
      </Link>
      <Link href="/register" passHref>
        <StyledButton disableHoverEffect={true}>
          Sign Up
        </StyledButton>
      </Link>
    </Box>
  );
}

export default AuthNavigation;
