import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MallEntity } from './entity/mall.entity';
import { MallDto } from './dto/mall.dto';
import { CreateMallDto } from './dto/mall.create.dto';

@Injectable()
export class MallsService {
    constructor(@InjectRepository(MallEntity)
    private readonly mallRepo: Repository<MallEntity>, ) { }

    async getAllMalls(): Promise<MallDto[]> {
        const malls = await this.mallRepo.find({ relations: ["products"] });
        return malls;
    }

    async createMall(
        createMallDto: CreateMallDto,
    ): Promise<MallDto> {
        const { name, fantasiaName, companyName, companyNumber, companyPhone, address, shoppingNumber, neighborhood, city, state, partners, financialId, legalId, avartar } = createMallDto;
        // check if the segment exists in the db
        const mallInDb = await this.mallRepo.findOne({ where: { name } });
        if (mallInDb) {
            throw new HttpException('Mall already exists', HttpStatus.BAD_REQUEST);
        }

        const mall: MallEntity = await this.mallRepo.create({
            name,
            fantasiaName,
            companyName,
            companyNumber,
            companyPhone,
            address,
            shoppingNumber,
            neighborhood,
            city,
            state,
            partners,
            financialId,
            legalId,
            avartar
        });

        await this.mallRepo.save(mall);

        return mall;
    }

    async destoryMall(id: string): Promise<MallDto> {
        const mall: MallEntity = await this.mallRepo.findOne({
            where: { id },
        });

        if (!mall) {
            throw new HttpException(
                `Mall list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.mallRepo.delete({ id }); // delete segment list
        return mall;
    }

    async getOneMall(id: string): Promise<MallDto> {
        const mall = await this.mallRepo.findOne({
            where: { id },
        });

        if (!mall) {
            throw new HttpException(
                `Mall list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return mall;
    }

    async updateMall(id: string, mallDto: MallDto): Promise<MallEntity> {
        let mall: MallEntity = await this.mallRepo.findOne({ where: { id } });
        if (!mall) {
            throw new HttpException(
                `Mall list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.mallRepo.update({ id }, mallDto); // update

        mall = await this.mallRepo.findOne({
            where: { id },
        }); // re-query

        return mall;
    }
}

