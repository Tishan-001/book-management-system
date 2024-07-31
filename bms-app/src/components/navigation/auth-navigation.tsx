import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { StyledButton } from '@/components/styled-button';

const AuthNavigation: FC = () => {
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
