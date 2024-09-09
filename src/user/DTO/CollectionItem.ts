import { IsNotEmpty } from 'class-validator';

export class CollectionItem {
  @IsNotEmpty({
    message: '请填写转盘配置项名称',
  })
  text: string;

  @IsNotEmpty({
    message: '请填写背景颜色',
  })
  background: string;

  @IsNotEmpty({
    message: '请填写权重',
  })
  priority: number | null;
}
