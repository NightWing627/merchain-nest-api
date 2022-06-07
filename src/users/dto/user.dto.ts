import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  profileImage?: string;
  @IsNotEmpty()
  userType?: string;
  @IsNotEmpty()
  phoneNumber?: string;
  @IsNotEmpty()
  password?: string;
  @IsNotEmpty()
  commission?: number;
  createdOn?: Date;
}
