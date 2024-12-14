import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserInfo } from './userInfo.entity';

@Entity()
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  fax?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkedInUrl?: string;

  @OneToOne(() => UserInfo, (user) => user.contact, { onDelete: 'CASCADE' })
  user: UserInfo;
}
