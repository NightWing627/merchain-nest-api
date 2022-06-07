import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SegmentEntity } from './entity/segment.entity';
import { SegmentDto } from './dto/segment.dto';
import { CreateSegmentDto } from './dto/segment.create.dto';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class SegmentsService {
    constructor(@InjectRepository(SegmentEntity)
    private readonly segmentRepo: Repository<SegmentEntity>, ) { }

    async getAllSegments(): Promise<SegmentDto[]> {
        const segments = await this.segmentRepo.find();
        return segments;
    }

    async createSegment(
        createSegmentDto: CreateSegmentDto,
    ): Promise<SegmentDto> {
        const { name } = createSegmentDto;
        // check if the segment exists in the db
        const segmentInDb = await this.segmentRepo.findOne({ where: { name } });
        if (segmentInDb) {
            throw new HttpException('Segment already exists', HttpStatus.BAD_REQUEST);
        }

        const segment: SegmentEntity = await this.segmentRepo.create({
            name,
        });

        await this.segmentRepo.save(segment);

        return segment;
    }

    async destorySegment(id: string): Promise<SegmentDto> {
        const segment: SegmentEntity = await this.segmentRepo.findOne({
            where: { id },
        });

        if (!segment) {
            throw new HttpException(
                `Segment list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.segmentRepo.delete({ id }); // delete segment list
        return segment;
    }

    async getOneSegment(id: string): Promise<SegmentDto> {
        const segment = await this.segmentRepo.findOne({
            where: { id },
        });

        if (!segment) {
            throw new HttpException(
                `Segment list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return segment;
    }

    async updateSegment(id: string, segmentDto: SegmentDto): Promise<SegmentEntity> {
        let segment: SegmentEntity = await this.segmentRepo.findOne({ where: { id } });
        if (!segment) {
            throw new HttpException(
                `Segment list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.segmentRepo.update({ id }, segmentDto); // update

        segment = await this.segmentRepo.findOne({
            where: { id },
        }); // re-query

        return segment;
    }
}

