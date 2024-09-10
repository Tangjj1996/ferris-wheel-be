import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DashboardOption, DashboardType } from '@/user/enum';

import { HotDashboardConfigItems } from './HotDashboardConfigItems';

@Entity({ name: 'hot_dashboard_config' })
export class HotDashboardConfig {
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

  @Column({ type: 'enum', enum: DashboardOption })
  dashboard_option: DashboardOption;

  @Column({ type: 'boolean', default: false })
  is_hot: boolean;

  @OneToMany(
    () => HotDashboardConfigItems,
    (hotDashboardConfigItems) => hotDashboardConfigItems.hot_dashboard_config,
  )
  hot_dashboard_config_items: HotDashboardConfigItems[];
}
