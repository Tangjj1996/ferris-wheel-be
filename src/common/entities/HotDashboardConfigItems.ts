import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { HotDashboardConfig } from './HotDashboardConfig';

@Entity({ name: 'hot_dashboard_config_items' })
export class HotDashboardConfigItems {
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
    () => HotDashboardConfig,
    (hotDashboardConfig) => hotDashboardConfig.hot_dashboard_config_items,
  )
  hot_dashboard_config: HotDashboardConfig;
}
