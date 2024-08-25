import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Auth } from '@/auth/entities/auth.entity';
import { UserDashboardConifgItems } from './UserDashboardConifgItems.entity';
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
    () => UserDashboardConifgItems,
    (item) => item.userDashboardConfig,
    {
      cascade: true,
    },
  )
  userDashboardConifgItems: UserDashboardConifgItems[];

  @ManyToOne(() => Auth, (auth) => auth.userDashboardConfig, {
    onDelete: 'CASCADE',
  })
  auth: Auth;
}
