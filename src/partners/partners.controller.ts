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
  import { PartnersService } from './partners.services'
  import { PartnerListDto } from './dto/partner.list.dto';
  import { CreatePartnerDto } from './dto/partner.create.dto';
  import { PartnerDto } from './dto/partner.dto';
  
  
  @Controller('api/partners')
  export class PartnersController {
    constructor(private readonly partnersService: PartnersService) { }
    @Get()
    async findAll(@Req() req: any): Promise<PartnerListDto> {
      const partners = await this.partnersService.getAllPartners();
      return { partners };
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PartnerDto> {
      return await this.partnersService.getOnePartner(id);
    }
  
    @Delete(':id')
    async destory(@Param('id') id: string): Promise<PartnerDto> {
      return await this.partnersService.destoryPartner(id);
    }
  
    @Post()
    async create(
      @Body() createPartnerDto: CreatePartnerDto,
    ): Promise<PartnerDto> {
      return await this.partnersService.createPartner(createPartnerDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() partnerDto: PartnerDto,
    ): Promise<PartnerDto> {
        return await this.partnersService.updatePartner(id, partnerDto);
    }

  }
  