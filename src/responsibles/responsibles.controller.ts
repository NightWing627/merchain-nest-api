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
  import { ResponsiblesService } from './responsibles.service'
  import { ResponsibleListDto } from './dto/responsible.list.dto';
  import { CreateResponsibleDto } from './dto/responsible.create.dto';
  import { ResponsibleDto } from './dto/responsible.dto';
  
  
  @Controller('api/responsibles')
  export class ResponsiblesController {
    constructor(private readonly responsiblesService: ResponsiblesService) { }
    @Get()
    async findAll(@Req() req: any): Promise<ResponsibleListDto> {
      const responsibles = await this.responsiblesService.getAllResponsibles();
      return { responsibles };
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ResponsibleDto> {
      return await this.responsiblesService.getOneResponsible(id);
    }
  
    @Delete(':id')
    async destory(@Param('id') id: string): Promise<ResponsibleDto> {
      return await this.responsiblesService.destoryResponsible(id);
    }
  
    @Post()
    async create(
      @Body() createResponsibleDto: CreateResponsibleDto,
    ): Promise<ResponsibleDto> {
      return await this.responsiblesService.createResponsible(createResponsibleDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() responsibleDto: ResponsibleDto,
    ): Promise<ResponsibleDto> {
        return await this.responsiblesService.updateResponsible(id, responsibleDto);
    }
  }
  