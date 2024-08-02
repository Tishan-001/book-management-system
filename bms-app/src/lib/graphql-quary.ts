import { gql } from '@apollo/client';

const GET_ALL_BOOKS = gql`
  query {
    findAllBooks {
      _id
      title
      coverImage
      author
      publishedYear
      genre
      pdfLink
      description
    }
  }
`;

const GET_BOOK_DETAILS = gql`
  query findOneBook($id: String!) {
    findOneBook(id: $id) {
      _id
      title
      coverImage
      author
      genre
      pdfLink
      publishedYear
      description
    }
  }
`;

export { GET_ALL_BOOKS, GET_BOOK_DETAILS };

