import { IsNotEmpty } from 'class-validator';

export class CollectionItem {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  background: string;

  @IsNotEmpty()
  priority: number | null;
}
