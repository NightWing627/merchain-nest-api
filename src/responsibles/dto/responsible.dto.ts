import { IsNotEmpty } from 'class-validator';

export class ResponsibleDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;
  description?: string;
}
