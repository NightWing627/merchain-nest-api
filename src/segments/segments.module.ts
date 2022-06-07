import { Module } from '@nestjs/common';
import { SegmentEntity } from './entity/segment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegmentsController } from './segments.controller';
import { SegmentsService } from './segments.service';
@Module({
    imports: [
      TypeOrmModule.forFeature([SegmentEntity]),
    ],
    controllers: [SegmentsController],
    providers: [SegmentsService],
  })
export class SegmentsModule {}
