export const mockUser = {
  _id: 'a-mock-id',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'hashedPassword',
};

export const mockUserModel = {
  findOne: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  find: jest.fn().mockReturnValue({
    exec: jest.fn(),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUser),
  }),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
  create: jest.fn().mockResolvedValue(mockUser),
};
