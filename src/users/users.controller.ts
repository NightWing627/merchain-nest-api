import {
    Controller,
    Get,
    Req,
    Param,
    Put,
    Body,
    Delete,
} from '@nestjs/common';
import {
    UserListDto
} from './dto/user.list.dto';
import {
    UserDto
} from './dto/user.dto';
import { UsersService } from './users.service';
@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Get()
    async findAll(@Req() req: any): Promise<UserListDto> {
        const users = await this.userService.getAllUsers();
        return { users };
    }
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserDto> {
        return await this.userService.getOneUser(id);
    }
    @Delete(':id')
    async destory(@Param('id') id: string): Promise<UserDto> {
        return await this.userService.destoryUser(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() userDto: UserDto,
    ): Promise<UserDto> {
        return await this.userService.updateUser(id, userDto);
    }
}
