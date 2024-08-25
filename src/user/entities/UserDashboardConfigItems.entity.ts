import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
  JoinColumn,
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
    (dashboardConfig) => dashboardConfig.userDashboardConfigItems,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_dashboard_config_id' })
  userDashboardConfig: UserDashboardConfig;
}
