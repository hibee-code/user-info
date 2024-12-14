import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserInfo } from './userInfo.entity';

@Entity()
export class UserAcademicBackground {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  schools: string[];

  @ManyToOne(() => UserInfo, (user) => user.academic, {
    onDelete: 'CASCADE',
  })
  user: UserInfo;
}
