import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Auth } from '@/auth/entities/auth.entity';

import { DashboardType } from '../enum';
import { UserDashboardConfigItems } from './UserDashboardConfigItems.entity';

@Entity({ name: 'user_dashboard_config' })
export class UserDashboardConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({
    type: 'char',
    length: 36,
  })
  key: string;

  @Column()
  dashboardTitle: string;

  @Column({ type: 'enum', enum: DashboardType })
  dashboardType: DashboardType;

  @OneToMany(
    () => UserDashboardConfigItems,
    (item) => item.userDashboardConfig,
    {
      cascade: true,
    },
  )
  userDashboardConfigItems: UserDashboardConfigItems[];

  @ManyToOne(() => Auth, (auth) => auth.userDashboardConfig, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  auth: Auth;
}
