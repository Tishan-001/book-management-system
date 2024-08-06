import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { mockUser, mockUserModel } from '../../test/mocks/user.mock';

describe('UserService', () => {
  let service: UserService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserInput: CreateUserInput = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
    };

    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    mockUserModel.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    mockUserModel.create.mockResolvedValue({
      ...createUserInput,
      _id: 'a-mock-id',
    });

    const result = await service.create(createUserInput);

    expect(result).toEqual({
      ...createUserInput,
      _id: 'a-mock-id',
    });
    expect(mockUserModel.findOne).toHaveBeenCalledWith({
      email: createUserInput.email,
    });
    expect(mockUserModel.create).toHaveBeenCalledWith({
      ...createUserInput,
      password: hashedPassword,
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([mockUser]),
      } as any);

      const result = await service.findAll();

      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const result = await service.findOne('a-mock-id');

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const result = await service.findByEmail('john@example.com');

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(
        service.findByEmail('nonexistent@example.com'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserInput: UpdateUserInput = {
        _id: 'a-mock-id',
        firstName: 'Jane',
      };

      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);
      jest.spyOn(model, 'updateOne').mockReturnValueOnce({
        exec: jest
          .fn()
          .mockResolvedValueOnce({ acknowledged: true, modifiedCount: 1 }),
      } as any);
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest
          .fn()
          .mockResolvedValueOnce({ ...mockUser, firstName: 'Jane' }),
      } as any);

      const result = await service.update('a-mock-id', updateUserInput);

      expect(result).toEqual({ ...mockUser, firstName: 'Jane' });
      expect(model.updateOne).toHaveBeenCalledWith(
        { _id: 'a-mock-id' },
        updateUserInput,
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      const updateUserInput: UpdateUserInput = {
        _id: 'non-existent-id',
        firstName: 'Jane',
      };

      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(
        service.update('non-existent-id', updateUserInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);
      jest.spyOn(model, 'deleteOne').mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValueOnce({ acknowledged: true, deletedCount: 1 }),
      } as any);

      await service.remove('a-mock-id');

      expect(model.deleteOne).toHaveBeenCalledWith({ _id: 'a-mock-id' });
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
