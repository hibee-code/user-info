import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserInfo } from './userInfo.entity';

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

  @OneToOne(() => UserInfo, (user) => user.address, { onDelete: 'CASCADE' })
  user: UserInfo;
}
