import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserDashboardConfig } from './UserDashboardConfig.entity';

@Entity({ name: 'user_dashboard_config_items' })
export class UserDashboardConfigItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({
    type: 'char',
    length: 36,
  })
  key: string;

  @Column()
  text: string;

  @Column()
  background: string;

  @Column({ nullable: true })
  priority: number | null;

  @ManyToOne(
    () => UserDashboardConfig,
    (dashboardConfig) => dashboardConfig.user_dashboard_config_items,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  user_dashboard_config: UserDashboardConfig;
}
