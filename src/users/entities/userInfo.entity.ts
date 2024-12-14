import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserAddress } from './userAddress.entity';
import { UserContact } from './userContact.entity';
import { UserAcademicBackground } from './userAcademicBackground.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  profilePhoto: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'varchar' })
  occupation: string;

  @Column({ type: 'varchar' })
  gender: string;

  @OneToOne(() => UserContact, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  contact: UserContact;

  @OneToOne(() => UserAddress, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  address: UserAddress;

  @OneToMany(() => UserAcademicBackground, (academic) => academic.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  academic: UserAcademicBackground[];
}
