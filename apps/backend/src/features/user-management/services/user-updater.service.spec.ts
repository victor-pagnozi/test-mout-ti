/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { UserUpdaterService } from './user-updater.service';
import { User } from '@app/common/models/user/user.model';
import { CacheService } from '@app/common/services/cache/cache.service';
import { CreateUserRequest } from '../requests/create-user.request';
import { FindUserResponse } from '../responses/find-user.response';
import { CacheKey } from '@app/common/common/enums/cache';
import { createMockUser } from '@app/common/tests/mocks/user.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Unit::UserUpdaterService', () => {
  let service: UserUpdaterService;
  let userRepository: jest.Mocked<Repository<User>>;
  let cacheService: jest.Mocked<CacheService>;

  const mockUser = createMockUser();

  const mockUpdateRequest: CreateUserRequest = {
    first_name: 'Updated User',
    last_name: 'User',
    email: 'test@example.com',
    password: 'plainPassword',
  };

  beforeEach(async () => {
    const mockUserRepository = {
      findOneByOrFail: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const mockCacheService = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUpdaterService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    service = module.get<UserUpdaterService>(UserUpdaterService);
    userRepository = module.get(getRepositoryToken(User));
    cacheService = module.get(CacheService);
  });

  describe('execute', () => {
    it('should update user successfully', async () => {
      const updatedUser = { ...mockUser, ...mockUpdateRequest };

      userRepository.findOneByOrFail.mockResolvedValue(mockUser);
      userRepository.save.mockResolvedValue(updatedUser);
      cacheService.delete.mockResolvedValue(undefined);

      const result = await service.execute(mockUser.id, mockUpdateRequest);

      expect(userRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: mockUser.id,
      });
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(mockUpdateRequest),
      );
      expect(cacheService.delete).toHaveBeenCalledWith(
        CacheKey.USER + mockUser.id,
      );
      expect(cacheService.delete).toHaveBeenCalledWith(CacheKey.USERS_ALL);
      expect(result).toBeInstanceOf(FindUserResponse);
    });

    it('should throw ConflictException when email exists for different user', async () => {
      const existingUser = { ...mockUser, id: 'different-id' };

      userRepository.findOneByOrFail.mockResolvedValue(mockUser);
      userRepository.findOne.mockResolvedValue(existingUser);

      await expect(
        service.execute(mockUser.id, {
          ...mockUpdateRequest,
          email: 'existing@email.com',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should not throw when email exists for same user', async () => {
      userRepository.findOneByOrFail.mockResolvedValue(mockUser);
      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);
      cacheService.delete.mockResolvedValue(undefined);

      await expect(
        service.execute(mockUser.id, mockUpdateRequest),
      ).resolves.not.toThrow();
    });

    it('should clear both user-specific and all-users cache', async () => {
      userRepository.findOneByOrFail.mockResolvedValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);
      cacheService.delete.mockResolvedValue(undefined);

      await service.execute(mockUser.id, mockUpdateRequest);

      expect(cacheService.delete).toHaveBeenCalledTimes(2);
      expect(cacheService.delete).toHaveBeenCalledWith(
        CacheKey.USER + mockUser.id,
      );
      expect(cacheService.delete).toHaveBeenCalledWith(CacheKey.USERS_ALL);
    });
  });

  describe('updateUserProperties', () => {
    it('should update all provided properties', () => {
      const user = { ...mockUser };
      const updateData = { first_name: 'New Name', email: 'new@email.com' };

      service['updateUserProperties'](user, updateData as CreateUserRequest);

      expect(user.first_name).toBe('New Name');
      expect(user.email).toBe('new@email.com');
    });

    it('should skip undefined properties', () => {
      const user = { ...mockUser };
      const originalEmail = user.email;
      const updateData = { first_name: 'New Name', email: undefined };

      service['updateUserProperties'](
        user,
        updateData as unknown as CreateUserRequest,
      );

      expect(user.first_name).toBe('New Name');
      expect(user.email).toBe(originalEmail);
    });

    it('should handle empty update data', () => {
      const user = { ...mockUser };
      const originalUser = { ...user };

      service['updateUserProperties'](user, {} as CreateUserRequest);

      expect(user).toEqual(originalUser);
    });
  });
});
