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

        // Save UserAcademics, map to an array of strings if necessary
        const savedAcademics = manager.create(UserAcademicBackground, {
          schools: academicBackground.map((ab) => ab.schools),
        });
        await manager.save(savedAcademics);

        // Save UserInfo with relations
        const newUser = manager.create(UserInfo, {
          ...userInfo,
          contact: savedContact,
          address: savedAddress,
          academicBackground: [savedAcademics],
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
      relations: ['contact', 'address', 'academicBackground'],
    });
  }

  async getUserById(id: number): Promise<UserInfo> {
    return this.dbManager.findOne(UserInfo, {
      where: { id },
      relations: ['contact', 'address', 'academicBackground'],
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Record<string, any>> {
    return await this.dbManager.transaction(async (manager) => {
      const {
        contact,
        address,
        academicBackground = [],
        ...userInfo
      } = updateUserDto;

      // Find existing user with relationships
      const user = await manager.findOne(UserInfo, {
        where: { id },
        relations: ['contact', 'address', 'academicBackground'],
      });
      if (!user) throw new Error('User not found');

      const updatedData: Record<string, any> = {}; // Track updated data for response

      // Update UserInfo fields
      if (Object.keys(userInfo).length > 0) {
        await manager.update(UserInfo, id, userInfo);
        updatedData.userInfo = userInfo;
      }

      // Update UserContact
      if (contact) {
        await manager.update(UserContact, user.contact.id, contact);
        updatedData.contact = contact;
      }

      // Update UserAddress
      if (address) {
        await manager.update(UserAddress, user.address.id, address);
        updatedData.address = address;
      }

      // Handle academicBackground updates
      if (Array.isArray(academicBackground)) {
        updatedData.academicBackground = [];

        // Track IDs to determine records to delete
        const updatedIds = academicBackground
          .filter((record) => record.id)
          .map((record) => record.id);

        // Delete records that are not in the update payload
        const existingIds = user.academicBackground.map((record) => record.id);
        const idsToDelete = existingIds.filter(
          (id) => !updatedIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await manager.delete(UserAcademicBackground, idsToDelete);
        }

        // Update or insert records
        for (const record of academicBackground) {
          if (record.id) {
            const existingAcademic = await manager.findOne(
              UserAcademicBackground,
              {
                where: { id: record.id },
              },
            );
            if (existingAcademic) {
              await manager.update(UserAcademicBackground, record.id, {
                ...record,
                schools: Array.isArray(record.schools)
                  ? record.schools
                  : [record.schools],
              });
              updatedData.academicBackground.push({
                ...existingAcademic,
                ...record,
              });
            }
          } else {
            const newAcademic = manager.create(UserAcademicBackground, {
              ...record,
              schools: Array.isArray(record.schools)
                ? record.schools
                : [record.schools],
              user,
            });
            const savedAcademic = await manager.save(
              UserAcademicBackground,
              newAcademic,
            );
            updatedData.academicBackground.push(savedAcademic);
          }
        }
      }

      return updatedData;
    });
  }

  async deleteUser(id: number): Promise<void> {
    return await this.dbManager.transaction(async (manager) => {
      const user = await manager.findOne(UserInfo, {
        where: { id },
        relations: ['contact', 'address', 'academicBackground'],
      });

      if (!user) throw new Error('User not found');

      // Delete the UserInfo entity; cascading will handle related entities
      await manager.delete(UserInfo, id);
    });
  }
}
