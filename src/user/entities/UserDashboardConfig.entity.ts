import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Auth } from '@/auth/entities/auth.entity';
import { UserDashboardConifgItems } from './UserDashboardConifgItems.entity';
import { DashboardType } from '../enum';

@Entity({ name: 'user_dashboard_config' })
export class UserDashboardConfig {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'dashboard_title' })
  dashboardTitle: string;

  @Column({ name: 'dashboard_type', type: 'enum', enum: DashboardType })
  dashboardType: DashboardType;

  @OneToMany(() => UserDashboardConifgItems, (item) => item.userDashboardConfig)
  userDashboardConifgItems: UserDashboardConifgItems[];

  @ManyToOne(() => Auth, (auth) => auth.userDashboardConfig)
  @JoinColumn({ name: 'openid', referencedColumnName: 'openid' })
  auth: Auth;
}
