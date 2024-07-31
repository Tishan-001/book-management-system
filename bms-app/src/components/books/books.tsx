"use client";

import React, { FC } from "react";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import { BookCardItem } from "@/components/book";
import Container from '@mui/material/Container';
import { data } from "./books.data";

const Books: FC = () => {
  return (
    <Box
      sx={{
        pt: {
          xs: 6,
          md: 8,
        },
        pb: 14,
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <BookCardItem key={String(item.id)} item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default Books;
