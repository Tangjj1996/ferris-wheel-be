import { IsEnum, IsNotEmpty } from 'class-validator';

import { DashboardOption, DashboardType } from '../enum';
import { CollectionItem } from './CollectionItem';

export class CollectionDTO {
  @IsNotEmpty({
    message: '请填写转盘名称',
  })
  dashboard_title: string;

  @IsEnum(DashboardType, {
    message: '请确认转盘风格',
  })
  dashboard_type: DashboardType;

  @IsNotEmpty({
    message: '请填写转盘类型',
  })
  dashboard_option: DashboardOption;

  @IsNotEmpty({
    message: '请填写转盘配置项',
  })
  user_dashboard_config_items: CollectionItem[];
}
