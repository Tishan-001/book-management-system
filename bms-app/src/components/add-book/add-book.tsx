"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  SelectChangeEvent,
  Container,
} from "@mui/material";
import { FileUploadButton } from "../styled-button";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK_MUTATION } from "@/lib";
import Alert from "@mui/material/Alert";
import { Book } from "@/interfaces/book";

const genres = [
  "Fiction",
  "Non-fiction",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Biography",
];

export default function AddBook() {
  const [book, setBook] = useState<Book>({
    _id: "",
    title: "",
    author: "",
    coverImage: "",
    publishedYear: "",
    genre: "",
    pdfLink: "",
    description: "",
  });
  const [pdf, setPdf] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [createBook] = useMutation(CREATE_BOOK_MUTATION);
  const [alert, setAlert] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("_id") : null;

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setCoverImage(file);
  };
  const handlePdfUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setPdf(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      const { data } = await createBook({
        variables: {
          createBookInput: {
            title: book.title,
            author: book.author,
            coverImage: coverImage ? coverImage.name : "",
            publishedYear: book.publishedYear,
            genre: book.genre,
            pdfLink: pdf ? pdf.name : "",
            description: book.description,
          },
          ownerId: userId,
        },
      });

      setAlert({ severity: "success", message: "Book added successfully" });
      setBook({
        _id: "",
        title: "",
        author: "",
        coverImage: "",
        publishedYear: "",
        genre: "",
        pdfLink: "",
        description: "",
      })
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        m: 4,
      }}
    >
      <Container component="main" maxWidth="md">
      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 600, margin: "auto", mt: 4 }}
          >
            <Typography variant="h4" gutterBottom>
              Add New Book
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Cover Image</Typography>
                <FileUploadButton onChange={handleImageUpload} />
                {coverImage && <Typography>{coverImage.name}</Typography>}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Published Year"
                  name="publishedYear"
                  value={book.publishedYear}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Genre</InputLabel>
                  <Select
                    name="genre"
                    value={book.genre}
                    onChange={handleChange}
                    label="Genre"
                  >
                    {genres.map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Book PDF</Typography>
                <FileUploadButton onChange={handlePdfUpload} />
                {pdf && <Typography>{pdf.name}</Typography>}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={book.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Add Book
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
