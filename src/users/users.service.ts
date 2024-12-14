import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UserInfo } from './entities/userInfo.entity';
import { UserContact } from './entities/userContact.entity';
import { UserAddress } from './entities/userAddress.entity';
import { UserAcademicBackground } from './entities/userAcademicBackground.entity';

@Injectable()
export class UsersService {
  private dbManager: EntityManager;

  constructor(private readonly datasource: DataSource) {
    this.dbManager = datasource.manager;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserInfo> {
    try {
      return await this.dbManager.transaction(async (manager) => {
        const { contact, address, academicBackground, ...userInfo } =
          createUserDto;

        // Save UserContact
        const savedContact = manager.create(UserContact, contact);
        await manager.save(savedContact);

        // Save UserAddress
        const savedAddress = manager.create(UserAddress, address);
        await manager.save(savedAddress);

        // Save UserAcademics
        const savedAcademics = manager.create(UserAcademicBackground, {
          schools: academicBackground,
        });
        await manager.save(savedAcademics);

        // Save UserInfo with relations
        const newUser = manager.create(UserInfo, {
          ...userInfo,
          contact: savedContact,
          address: savedAddress,
          academics: savedAcademics,
        });
        return await manager.save(newUser);
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed. Please try again.');
    }
  }

  async getAllUsers(): Promise<UserInfo[]> {
    return this.dbManager.find(UserInfo, {
      relations: ['contact', 'address', 'academic'],
    });
  }

  async getUserById(id: number): Promise<UserInfo> {
    return this.dbManager.findOne(UserInfo, {
      where: { id },
      relations: ['contact', 'address', 'academic'],
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInfo> {
    return await this.dbManager.transaction(async (manager) => {
      const { contact, address, academicBackground, ...userInfo } =
        updateUserDto;

      // Find existing user
      const user = await manager.findOne(UserInfo, {
        where: { id },
        relations: ['contact', 'address', 'academic'],
      });
      if (!user) throw new Error('User not found');

      // Update UserContact
      await manager.update(UserContact, user.contact.id, contact);

      // Update UserAddress
      await manager.update(UserAddress, user.address.id, address);

      // Update UserAcademics
      if (Array.isArray(user.academic)) {
        await Promise.all(
          user.academic.map((academicRecord, index) =>
            manager.update(
              UserAcademicBackground,
              academicRecord.id,
              academicBackground[index],
            ),
          ),
        );
      }

      // Update UserInfo
      await manager.update(UserInfo, id, userInfo);

      return await manager.findOne(UserInfo, {
        where: { id },
        relations: ['contact', 'address', 'academic'],
      });
    });
  }

  async deleteUser(id: number): Promise<void> {
    return await this.dbManager.transaction(async (manager) => {
      const user = await manager.findOne(UserInfo, {
        where: { id },
        relations: ['contact', 'address', 'academic'],
      });
      if (!user) throw new Error('User not found');

      // Delete associations
      await manager.delete(UserContact, user.contact.id);
      await manager.delete(UserAddress, user.address.id);

      // Handle the academic background which is an array
      if (Array.isArray(user.academic)) {
        await Promise.all(
          user.academic.map((academicRecord) =>
            manager.delete(UserAcademicBackground, academicRecord.id),
          ),
        );
      }

      // Delete UserInfo
      await manager.delete(UserInfo, id);
    });
  }
}
