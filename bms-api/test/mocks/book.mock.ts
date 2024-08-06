export const mockBook = {
  _id: 'a-mock-id',
  title: 'Test Book',
  author: 'Test Author',
  publishedYear: '2023',
  description: 'Test Description',
  ownerId: 'user-id',
  coverImage: 'test-cover.jpg',
  genre: 'Test Genre',
  pdfLink: 'test-pdf-link.pdf',
};

export const mockBookModel = {
  findOne: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  find: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  updateOne: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  deleteOne: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  create: jest.fn(),
};
