import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponsibleEntity } from './entity/responsible.entity';
import { ResponsibleDto } from './dto/responsible.dto';
import { CreateResponsibleDto } from './dto/responsible.create.dto';

@Injectable()
export class ResponsiblesService {
    constructor(@InjectRepository(ResponsibleEntity)
    private readonly responsibleRepo: Repository<ResponsibleEntity>, ) { }

    async getAllResponsibles(): Promise<ResponsibleDto[]> {
        const responsibles = await this.responsibleRepo.find();
        return responsibles;
    }

    async createResponsible(
        createResponsibleDto: CreateResponsibleDto,
    ): Promise<ResponsibleDto> {
        const { name } = createResponsibleDto;
        // check if the segment exists in the db
        const responsibleInDb = await this.responsibleRepo.findOne({ where: { name } });
        if (responsibleInDb) {
            throw new HttpException('Responsible already exists', HttpStatus.BAD_REQUEST);
        }

        const responsible: ResponsibleEntity = await this.responsibleRepo.create({
            name,
        });

        await this.responsibleRepo.save(responsible);

        return responsible;
    }

    async destoryResponsible(id: string): Promise<ResponsibleDto> {
        const responsible: ResponsibleEntity = await this.responsibleRepo.findOne({
            where: { id },
        });

        if (!responsible) {
            throw new HttpException(
                `Responsible list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.responsibleRepo.delete({ id }); // delete segment list
        return responsible;
    }

    async getOneResponsible(id: string): Promise<ResponsibleDto> {
        const responsible = await this.responsibleRepo.findOne({
            where: { id },
        });

        if (!responsible) {
            throw new HttpException(
                `Responsible list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return responsible;
    }

    async updateResponsible(id: string, responsibleDto: ResponsibleDto): Promise<ResponsibleEntity> {
        let responsible: ResponsibleEntity = await this.responsibleRepo.findOne({ where: { id } });
        if (!responsible) {
            throw new HttpException(
                `Responsible list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.responsibleRepo.update({ id }, responsibleDto); // update

        responsible = await this.responsibleRepo.findOne({
            where: { id },
        }); // re-query

        return responsible;
    }
}

