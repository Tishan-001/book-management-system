"use client";

import React from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import Image from 'next/image';
import { data } from '@/components/books/books.data';
import { Book } from '@/interfaces/book';

interface BookDetailsProps {
  id: number;
}

const BookDetails: React.FC<BookDetailsProps> = ({ id }) => {

  // Convert id to number if it's a string
  const bookId = typeof id === 'string' ? parseInt(id, 10) : id;
  
  const book: Book | undefined = data.find((book) => book.id === bookId);

  console.log("Found book:", book);

  if (!book) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6">Book not found. ID: {bookId}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Image src={book.cover} width={260} height={260} alt={`Book cover of ${book.title}`} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" color="primary" gutterBottom>
              {book.author.toUpperCase()}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Publised Year: {book.publishedYear}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 2 }}
            >
              Download Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookDetails;