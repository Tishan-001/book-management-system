"use client";

import React, { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { BookCardItem } from "@/components/book";
import Container from "@mui/material/Container";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "@/lib";
import { Book } from "@/interfaces/book";

const Books: FC = () => {
  const { loading, error, data } = useQuery<{ findAllBooks: Book[] }>(
    GET_ALL_BOOKS
  );

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
          zIndex: 1300,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) return <p>Error: {error.message}</p>;

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
          {data?.findAllBooks.map((item: Book, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BookCardItem key={String(index)} item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default Books;
