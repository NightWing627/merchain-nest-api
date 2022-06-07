import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '@user/entity/user.entity';
import { toUserDto } from '@shared/mapper';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { comparePasswords } from '@shared/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({ where: { username } });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email, phoneNumber, profileImage, userType,commission } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({ where: { username } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    } else {
      const user: UserEntity = this.userRepo.create({
        username,
        password,
        email,
        phoneNumber, profileImage, userType,commission
      });
      await this.userRepo.save(user);
      return user;
    }
  }

  private _sanitizeUser(user: UserEntity) {
    delete user.password;
    return user;
  }
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async getOneUser(id: string): Promise<UserDto> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        `User list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async destoryUser(id: string): Promise<UserDto> {
    const user: UserEntity = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        `User list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userRepo.delete({ id }); // delete User list
    return user;
  }

  async updateUser(id: string, userDto: UserDto): Promise<UserEntity> {
    let user: UserEntity = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        `User list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepo.update({ id }, userDto); // update

    user = await this.userRepo.findOne({
      where: { id },
    }); // re-query

    return user;
  }
}
