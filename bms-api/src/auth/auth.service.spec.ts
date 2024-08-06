import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    decode: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return an access token and user id if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        email,
        password: hashedPassword,
        _id: 'user-id',
      };

      mockUserService.findByEmail.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await service.signIn(email, password);

      expect(result).toEqual({
        access_token: 'jwt-token',
        _id: 'user-id',
      });
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email,
        sub: 'user-id',
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      mockUserService.findByEmail.mockResolvedValue(null);

      await expect(service.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        email,
        password: hashedPassword,
        _id: 'user-id',
      };

      mockUserService.findByEmail.mockResolvedValue(user);

      await expect(service.signIn(email, wrongPassword)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('extractUserIdFromToken', () => {
    it('should return user id from token', () => {
      const token = 'jwt-token';
      const decoded = { sub: 'user-id' };

      mockJwtService.decode.mockReturnValue(decoded);

      const result = service.extractUserIdFromToken(token);

      expect(result).toBe('user-id');
      expect(mockJwtService.decode).toHaveBeenCalledWith(token);
    });

    it('should return undefined if token is invalid', () => {
      const token = 'invalid-token';

      mockJwtService.decode.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = service.extractUserIdFromToken(token);

      expect(result).toBeUndefined();
      expect(mockJwtService.decode).toHaveBeenCalledWith(token);
    });
  });
});
