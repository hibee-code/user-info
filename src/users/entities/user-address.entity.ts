import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  zipCode: string;

  //   Optionally, you can add a foreign key to the UserInfo table if it's a one-to-one or one-to-many relationship
  @ManyToOne(() => UserInfo, (userInfo) => userInfo.addresses)
  user: UserInfo;
}
