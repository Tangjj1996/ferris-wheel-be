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
  dashboard_title: string;

  @Column({ type: 'enum', enum: DashboardType })
  dashboard_type: DashboardType;

  @OneToMany(
    () => UserDashboardConfigItems,
    (item) => item.user_dashboard_config,
    {
      cascade: true,
    },
  )
  user_dashboard_config_items: UserDashboardConfigItems[];

  @ManyToOne(() => Auth, (auth) => auth.user_dashboard_config, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  auth: Auth;
}
