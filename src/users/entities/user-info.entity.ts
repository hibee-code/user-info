import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserAddress } from './user-address.entity';
import { UserContact } from './user-contact.entity';
import { UserAcademic } from './user-academic.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  profilePhoto: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'varchar', length: 100 })
  occupation: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  // relationship
  @OneToOne(() => UserContact, (userContact) => userContact.user)
  contact: UserContact;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.user)
  addresses: UserAddress[];
  @OneToMany(() => UserAcademic, (userAcademic) => userAcademic.user)
  academics: UserAcademic[];
}
