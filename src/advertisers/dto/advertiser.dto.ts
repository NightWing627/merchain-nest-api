import { IsNotEmpty } from 'class-validator';

export class AdvertiserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;
  description?: string;
}
