import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';

import { DashboardType } from '../enum';
import { CollectionItem } from './CollectionItem';

export class CollectionDTO {
  @IsNotEmpty()
  dashboard_title: string;

  @IsEnum(DashboardType)
  dashboard_type: DashboardType;

  @IsNotEmptyObject()
  user_dashboard_config_items: CollectionItem[];
}
