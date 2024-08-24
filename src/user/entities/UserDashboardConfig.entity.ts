import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserDashboardConfig {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'dashboard_title' })
  dashboardTitle: string;

  @Column({ name: 'dashboard_type', type: 'char' })
  dashboardType: string;
}
