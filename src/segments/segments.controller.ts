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
import { SegmentsService } from './segments.service'
import { SegmentListDto } from './dto/segment.list.dto';
import { CreateSegmentDto } from './dto/segment.create.dto';
import { SegmentDto } from './dto/segment.dto';


@Controller('api/segments')
export class SegmentsController {
  constructor(private readonly segmentsService: SegmentsService) { }
  @Get()
  async findAll(@Req() req: any): Promise<SegmentListDto> {
    const segments = await this.segmentsService.getAllSegments();
    return { segments };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SegmentDto> {
    return await this.segmentsService.getOneSegment(id);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<SegmentDto> {
    return await this.segmentsService.destorySegment(id);
  }

  @Post()
  async create(
    @Body() createSegmentDto: CreateSegmentDto,
  ): Promise<SegmentDto> {
    return await this.segmentsService.createSegment(createSegmentDto);
  }

  @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() segmentDto: SegmentDto,
    ): Promise<SegmentDto> {
        return await this.segmentsService.updateSegment(id, segmentDto);
    }
}
