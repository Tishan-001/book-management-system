import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book, BookDocument } from './schema/book.schema';
import { User, UserDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { mockBook, mockBookModel } from '../../test/mocks/book.mock';
import { mockUser } from '../../test/mocks/user.mock';

describe('BookService', () => {
  let service: BookService;
  let bookModel: Model<BookDocument>;
  let userModel: Model<UserDocument>;

  const mockUserModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should create a new book', () => {
    it('should create a new book', async () => {
      const createBookInput: CreateBookInput = {
        title: 'Test Book',
        author: 'Test Author',
        publishedYear: '2023',
        description: 'Test Description',
        coverImage: 'test-cover.jpg',
        genre: 'Test Genre',
        pdfLink: 'test-pdf-link.pdf',
      };

      userModel.findById = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });
      bookModel.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
      bookModel.create = jest.fn().mockResolvedValue(mockBook);

      const result = await service.create(createBookInput, 'user-id');

      expect(result).toEqual(mockBook);
      expect(userModel.findById).toHaveBeenCalledWith('user-id');
      expect(bookModel.findOne).toHaveBeenCalledWith({
        title: createBookInput.title,
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      userModel.findById = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await expect(
        service.create({} as CreateBookInput, 'non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  it('should throw NotFoundException if user is not found', async () => {
    mockUserModel.findById().exec.mockResolvedValue(null);

    await expect(
      service.create({} as CreateBookInput, 'non-existent-id'),
    ).rejects.toThrow(NotFoundException);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      jest.spyOn(bookModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([mockBook]),
      } as any);

      const result = await service.findAll();

      expect(result).toEqual([mockBook]);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if book is not found', async () => {
      bookModel.findById = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  it('should update a book', async () => {
    const updateBookInput: UpdateBookInput = {
      title: 'Updated Book Title',
    };

    bookModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockBook),
    });
    bookModel.updateOne = jest.fn().mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValue({ acknowledged: true, modifiedCount: 1 }),
    });

    const result = await service.update('a-mock-id', updateBookInput);

    expect(result).toEqual(mockBook);
    expect(bookModel.updateOne).toHaveBeenCalledWith(
      { _id: 'a-mock-id' },
      updateBookInput,
    );
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      jest.spyOn(bookModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockBook),
      } as any);
      jest.spyOn(bookModel, 'deleteOne').mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValueOnce({ acknowledged: true, deletedCount: 1 }),
      } as any);

      await service.remove('a-mock-id');

      expect(bookModel.deleteOne).toHaveBeenCalledWith({ _id: 'a-mock-id' });
    });

    it('should throw NotFoundException if book is not found', async () => {
      jest.spyOn(bookModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
