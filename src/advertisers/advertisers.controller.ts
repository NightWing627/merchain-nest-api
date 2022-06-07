import {
    Controller,
    Get,
    Req,
    Param,
    Post,
    Body,
    Delete,
    Put,
  } from '@nestjs/common';
  import { AdvertisersService } from './advertisers.service'
  import { AdvertiserListDto } from './dto/advertiser.list.dto';
  import { CreateAdvertiserDto } from './dto/advertiser.create.dto';
  import { AdvertiserDto } from './dto/advertiser.dto';

@Controller('api/advertisers')
export class AdvertisersController {
    
  constructor(private readonly advertiserService: AdvertisersService) { }
  @Get()
  async findAll(@Req() req: any): Promise<AdvertiserListDto> {
    const advertisers = await this.advertiserService.getAllAdvertisers();
    return { advertisers };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AdvertiserDto> {
    return await this.advertiserService.getOneAdvertiser(id);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<AdvertiserDto> {
    return await this.advertiserService.destoryAdvertiser(id);
  }

  @Post()
  async create(
    @Body() createAdvertiserDto: CreateAdvertiserDto,
  ): Promise<AdvertiserDto> {
    return await this.advertiserService.createAdvertiser(createAdvertiserDto);
  }

  @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() advertiserDto: AdvertiserDto,
    ): Promise<AdvertiserDto> {
        return await this.advertiserService.updateAdvertiser(id, advertiserDto);
    }
}
