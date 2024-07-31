import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FooterSocialLinks } from '@/components/footer';

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{ 
        backgroundColor: 'primary.main', 
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="sm">
        <Typography component="h2" variant="h2" sx={{ mb: 2 }}>
          Bookspace
        </Typography>
        <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
          Bookspace is an online Book Management platform that has been operating since 2024.
        </Typography>
        <FooterSocialLinks />
      </Container>
    </Box>
  )
}

export default Footer;