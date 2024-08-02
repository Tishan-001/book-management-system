"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import { Book } from "@/interfaces/book";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOK_DETAILS, REMOVE_BOOK, UPDATE_BOOK } from "@/lib";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

interface BookDetailsProps {
  id: string;
}

const genres = [
  "Fiction",
  "Non-fiction",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Biography",
];

const BookDetails: React.FC<BookDetailsProps> = ({ id }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedBook, setEditedBook] = useState<Partial<Book>>({});
  const [alert, setAlert] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const { loading, error, data } = useQuery<{ findOneBook: Book }>(
    GET_BOOK_DETAILS,
    {
      variables: { id },
    }
  );

  const [removeBook, { loading: deleting, error: deleteError }] = useMutation(
    REMOVE_BOOK,
    {
      refetchQueries: [{ query: GET_BOOK_DETAILS, variables: { id } }],
      onCompleted: () => {
        setAlert({ severity: "success", message: "Book deleted successfully" });
        router.push("/books");
      },
    }
  );

  const [updateBook, { loading: updating, error: updateError }] = useMutation(
    UPDATE_BOOK,
    {
      refetchQueries: [{ query: GET_BOOK_DETAILS, variables: { id } }],
      onCompleted: () => {
        setAlert({ severity: "success", message: "Book updated successfully" });
        setIsEditModalOpen(false);
      },
    }
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

  const book = data?.findOneBook;

  if (!book) {
    return <p>Book not found</p>;
  }

  const handleDelete = async () => {
    try {
      await removeBook({ variables: { id: book._id } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = () => {
    setEditedBook({
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
      description: book.description,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({
        variables: {
          id: book._id,
          input: editedBook,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Image
              src={book.coverImage}
              width={260}
              height={260}
              alt={`Book cover of ${book.title}`}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" color="primary" gutterBottom>
                {book.author.toUpperCase()}
              </Typography>
              <Box>
                <IconButton
                  color="primary"
                  aria-label="edit book"
                  onClick={handleEditClick}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="delete book"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Published Year: {book.publishedYear}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Description: {book.description}
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

      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        aria-labelledby="edit-book-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Edit Book
          </Typography>
          <IconButton
            onClick={() => setIsEditModalOpen(false)}
            sx={{
              position: "absolute",
              right: 1,
              top: 1,
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleEditSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={editedBook.title || ""}
              onChange={handleEditChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Author"
              name="author"
              value={editedBook.author || ""}
              onChange={handleEditChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Published Year"
              name="publishedYear"
              type="number"
              value={editedBook.publishedYear || ""}
              onChange={handleEditChange}
            />
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                name="genre"
                value={book.genre}
                onChange={handleEditChange}
                label="Genre"
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={editedBook.description || ""}
              onChange={handleEditChange}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={updating}
              >
                Update Book
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default BookDetails;
