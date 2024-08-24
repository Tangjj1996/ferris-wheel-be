import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { UserDashboardConfig } from './UserDashboardConfig.entity';

@Entity({ name: 'user_dashboard_config_items' })
export class UserDashboardConifgItems {
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

  @Column()
  user_dashboard_config_id: number;

  @ManyToOne(
    () => UserDashboardConfig,
    (dashboardConfig) => dashboardConfig.userDashboardConifgItems,
    {
      onDelete: 'CASCADE',
    },
  )
  userDashboardConfig: UserDashboardConfig;
}
