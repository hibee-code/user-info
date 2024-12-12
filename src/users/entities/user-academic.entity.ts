import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity()
export class UserAcademic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  schoolName: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  degree?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fieldOfStudy?: string;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.academics, {
    onDelete: 'CASCADE',
  })
  user: UserInfo;
}
