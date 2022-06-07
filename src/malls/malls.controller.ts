import {
    Controller,
    Get,
    Req,
    Param,
    Post,
    Body,
    Delete,
    Put
  } from '@nestjs/common';
  import { MallsService } from './malls.service'
  import { MallListDto } from './dto/mall.list.dto';
  import { CreateMallDto } from './dto/mall.create.dto';
  import { MallDto } from './dto/mall.dto';
  
  
  @Controller('api/malls')
  export class MallsController {
    constructor(private readonly mallsService: MallsService) { }
    @Get()
    async findAll(@Req() req: any): Promise<MallListDto> {
      const malls = await this.mallsService.getAllMalls();
      return { malls };
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<MallDto> {
      return await this.mallsService.getOneMall(id);
    }
  
    @Delete(':id')
    async destory(@Param('id') id: string): Promise<MallDto> {
      return await this.mallsService.destoryMall(id);
    }
  
    @Post()
    async create(
      @Body() createMallDto: CreateMallDto,
    ): Promise<MallDto> {
      return await this.mallsService.createMall(createMallDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() mallDto: MallDto,
    ): Promise<MallDto> {
        return await this.mallsService.updateMall(id, mallDto);
    }
  }
  