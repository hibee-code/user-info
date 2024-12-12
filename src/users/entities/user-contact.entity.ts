import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity()
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  fax?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkedInUrl?: string;

  // Optionally, you can add a foreign key to the UserInfo table if it's a one-to-one or one-to-many relationship
  @OneToOne(() => UserInfo, (userInfo) => userInfo.contact)
  user: UserInfo;
}
