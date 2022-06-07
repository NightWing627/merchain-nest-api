
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvertisersEntity } from './entity/advertisers.entity';
import { AdvertiserDto } from './dto/advertiser.dto';
import { CreateAdvertiserDto } from './dto/advertiser.create.dto';

@Injectable()
export class AdvertisersService {
    constructor(@InjectRepository(AdvertisersEntity)
    private readonly advertiserRepo: Repository<AdvertisersEntity>, ) { }

    async getAllAdvertisers(): Promise<AdvertiserDto[]> {
        const advertisertypes = await this.advertiserRepo.find();
        return advertisertypes;
    }

    async createAdvertiser(
        createAdvertiserDto: CreateAdvertiserDto,
    ): Promise<AdvertiserDto> {
        const { name } = createAdvertiserDto;
        // check if the segment exists in the db
        const advertiserInDb = await this.advertiserRepo.findOne({ where: { name } });
        if (advertiserInDb) {
            throw new HttpException('Advertiser already exists', HttpStatus.BAD_REQUEST);
        }

        const advertiser: AdvertisersEntity = await this.advertiserRepo.create({
            name,
        });

        await this.advertiserRepo.save(advertiser);

        return advertiser;
    }

    async destoryAdvertiser(id: string): Promise<AdvertiserDto> {
        const advertiser: AdvertisersEntity = await this.advertiserRepo.findOne({
            where: { id },
        });

        if (!advertiser) {
            throw new HttpException(
                `Advertiser list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.advertiserRepo.delete({ id }); // delete segment list
        return advertiser;
    }

    async getOneAdvertiser(id: string): Promise<AdvertiserDto> {
        const advertiser = await this.advertiserRepo.findOne({
            where: { id },
        });

        if (!advertiser) {
            throw new HttpException(
                `Advertiser list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return advertiser;
    }

    async updateAdvertiser(id: string, advertiserDto: AdvertiserDto): Promise<AdvertisersEntity> {
        let advertiser: AdvertisersEntity = await this.advertiserRepo.findOne({ where: { id } });
        if (!advertiser) {
            throw new HttpException(
                `Advertiser list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.advertiserRepo.update({ id }, advertiserDto); // update

        advertiser = await this.advertiserRepo.findOne({
            where: { id },
        }); // re-query

        return advertiser;
    }
}
