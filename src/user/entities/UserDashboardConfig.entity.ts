import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
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

  @Column({ type: 'char', length: 36 })
  openid: string;

  @OneToMany(() => UserDashboardConifgItems, (item) => item.userDashboardConfig)
  userDashboardConifgItems: UserDashboardConifgItems[];
}
