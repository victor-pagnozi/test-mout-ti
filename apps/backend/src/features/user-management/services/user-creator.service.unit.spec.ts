/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { UserCreatorService } from './user-creator.service';
import { User } from '@app/common/models/user/user.model';
import { HasherService } from '@app/common/services/hasher/hasher.service';
import { CacheService } from '@app/common/services/cache/cache.service';
import { CreateUserRequest } from '../requests/create-user.request';
import { FindUserResponse } from '../responses/find-user.response';
import { CacheKey } from '@app/common/common/enums/cache';
import { createMockUser } from '@app/common/tests/mocks/user.mock';

describe('Unit::UserCreatorService', () => {
  let service: UserCreatorService;
  let userRepository: jest.Mocked<Repository<User>>;
  let hasherService: jest.Mocked<HasherService>;
  let cacheService: jest.Mocked<CacheService>;

  const mockUser = createMockUser();

  const mockCreateUserRequest: CreateUserRequest = {
    first_name: 'Test User',
    last_name: 'User',
    email: 'test@example.com',
    password: 'plainPassword',
  };

  beforeEach(async () => {
    const mockUserRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
    };

    const mockHasherService = {
      hash: jest.fn(),
    };

    const mockCacheService = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreatorService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: HasherService,
          useValue: mockHasherService,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    service = module.get<UserCreatorService>(UserCreatorService);
    userRepository = module.get(getRepositoryToken(User));
    hasherService = module.get(HasherService);
    cacheService = module.get(CacheService);
  });

  describe('execute', () => {
    it('should create a user successfully', async () => {
      userRepository.findOne.mockResolvedValue(null);
      hasherService.hash.mockResolvedValue('hashedPassword');
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);
      cacheService.delete.mockResolvedValue(undefined);

      const result = await service.execute(mockCreateUserRequest);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: mockCreateUserRequest.email },
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        ...mockCreateUserRequest,
      });
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(cacheService.delete).toHaveBeenCalledWith(CacheKey.USERS_ALL);
      expect(result).toBeInstanceOf(FindUserResponse);
      expect(result.id).toBe(mockUser.id);
    });

    it('should throw ConflictException when email already exists', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      await expect(service.execute(mockCreateUserRequest)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.execute(mockCreateUserRequest)).rejects.toThrow(
        'Email already exists',
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: mockCreateUserRequest.email },
      });
      expect(hasherService.hash).not.toHaveBeenCalled();
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
      expect(cacheService.delete).not.toHaveBeenCalled();
    });

    it('should clear cache after user creation', async () => {
      userRepository.findOne.mockResolvedValue(null);
      hasherService.hash.mockResolvedValue('hashedPassword');
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);
      cacheService.delete.mockResolvedValue(undefined);

      await service.execute(mockCreateUserRequest);

      expect(cacheService.delete).toHaveBeenCalledWith(CacheKey.USERS_ALL);
      expect(cacheService.delete).toHaveBeenCalledTimes(1);
    });

    it('should handle repository save failure', async () => {
      const saveError = new Error('Database error');
      userRepository.findOne.mockResolvedValue(null);
      hasherService.hash.mockResolvedValue('hashedPassword');
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockRejectedValue(saveError);

      await expect(service.execute(mockCreateUserRequest)).rejects.toThrow(
        'Database error',
      );
      expect(cacheService.delete).not.toHaveBeenCalled();
    });

    it('should handle hashing failure', async () => {
      const hashError = new Error('Hashing failed');
      userRepository.findOne.mockResolvedValue(null);
      hasherService.hash.mockRejectedValue(hashError);

      await expect(service.execute(mockCreateUserRequest)).rejects.toThrow(
        'Hashing failed',
      );
      expect(userRepository.create).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
      expect(cacheService.delete).not.toHaveBeenCalled();
    });
  });

  describe('validateEmailUniqueness', () => {
    it('should not throw when email is unique', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(
        service['validateEmailUniqueness']('unique@example.com'),
      ).resolves.not.toThrow();
    });

    it('should throw ConflictException when email exists', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      await expect(
        service['validateEmailUniqueness']('existing@example.com'),
      ).rejects.toThrow(ConflictException);
    });

    it('should handle repository findOne failure', async () => {
      const findError = new Error('Database connection error');
      userRepository.findOne.mockRejectedValue(findError);

      await expect(
        service['validateEmailUniqueness']('test@example.com'),
      ).rejects.toThrow('Database connection error');
    });
  });
});
