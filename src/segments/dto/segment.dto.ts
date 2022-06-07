import { IsNotEmpty } from 'class-validator';

export class SegmentDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;
  description?: string;
}
