"use client";

import React, { FC } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { StyledButton } from '../styled-button';

const ContactUs: FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', py: { xs: 8, md: 10 } }}>
      <Container>
        <Box
          sx={{
            backgroundColor: 'secondary.main',
            borderRadius: 10,
            py: { xs: 4, md: 6 },
            px: { xs: 4, md: 8 },
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" component="h2" sx={{ mb: 2, fontSize: { xs: 28, md: 36 } }}>
            Contact Us
          </Typography>
          <Typography sx={{ mb: 4 }}>We'd love to hear from you. Please fill out the form below to get in touch.</Typography>

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            {/* First row: Name and Email */}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <InputBase
                sx={{
                  flex: 1,
                  backgroundColor: 'background.paper',
                  borderRadius: 3,
                  height: 48,
                  px: 2,
                }}
                placeholder="Your Name"
              />
              <InputBase
                sx={{
                  flex: 1,
                  backgroundColor: 'background.paper',
                  borderRadius: 3,
                  height: 48,
                  px: 2,
                }}
                placeholder="Your Email Address"
                type="email"
              />
            </Box>

            {/* Second row: Message */}
            <InputBase
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 3,
                width: '100%',
                minHeight: 96,
                px: 2,
                py: 1,
              }}
              placeholder="Your Message"
              multiline
              rows={4}
            />

            <Box sx={{ mt: 2 }}>
              <StyledButton disableHoverEffect size="large">
                Send Message
              </StyledButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ContactUs;