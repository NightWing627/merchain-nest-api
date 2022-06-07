import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  phoneNumber:string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  userType:string;
  @IsNotEmpty()
  profileImage:string;
  @IsNotEmpty()
  commission:number;
}
