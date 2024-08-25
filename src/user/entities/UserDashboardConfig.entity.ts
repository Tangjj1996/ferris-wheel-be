import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Auth } from '@/auth/entities/auth.entity';
import { UserDashboardConfigItems } from './UserDashboardConfigItems.entity';
import { DashboardType } from '../enum';

@Entity({ name: 'user_dashboard_config' })
export class UserDashboardConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dashboard_title' })
  dashboardTitle: string;

  @Column({ name: 'dashboard_type', type: 'enum', enum: DashboardType })
  dashboardType: DashboardType;

  @OneToMany(
    () => UserDashboardConfigItems,
    (item) => item.userDashboardConfig,
    {
      cascade: true,
    },
  )
  UserDashboardConfigItems: UserDashboardConfigItems[];

  @ManyToOne(() => Auth, (auth) => auth.userDashboardConfig, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'openid' })
  auth: Auth;
}
