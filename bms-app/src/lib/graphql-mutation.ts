import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(loginUserInput: { email: $email, password: $password }) {
      access_token
      _id
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($createUserInput: CreateUserInput!) {
    register(createUserInput: $createUserInput) {
      firstName
      lastName
      email
    }
  }
`;

const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      url
    }
  }
`;

const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($createBookInput: CreateBookInput!, $ownerId: String!) {
    createBook(createBookInput: $createBookInput, ownerId: $ownerId) {
      title
      author
      coverImage
      publishedYear
      genre
      pdfLink
      description
    }
  }
`;

const REMOVE_BOOK = gql`
  mutation RemoveBook($id: String!) {
    removeBook(id: $id)
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: String!, $input: UpdateBookInput!) {
    updateBook(id: $id, updateBookInput: $input) {
      _id
      title
      author
      publishedYear
      genre
      description
    }
  }
`;


export { LOGIN_MUTATION, REGISTER_MUTATION, UPLOAD_FILE_MUTATION, CREATE_BOOK_MUTATION, REMOVE_BOOK, UPDATE_BOOK };
