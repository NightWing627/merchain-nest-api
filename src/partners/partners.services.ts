import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerEntity } from './entity/partner.entity';
import { PartnerDto } from './dto/partner.dto';
import { CreatePartnerDto } from './dto/partner.create.dto';

@Injectable()
export class PartnersService {
    constructor(@InjectRepository(PartnerEntity)
    private readonly partnerRepo: Repository<PartnerEntity>, ) { }

    async getAllPartners(): Promise<PartnerDto[]> {
        const partners = await this.partnerRepo.find();
        return partners;
    }

    async createPartner(
        createPartnerDto: CreatePartnerDto,
    ): Promise<PartnerDto> {
        const { companyNumber, companyName } = createPartnerDto;
        // check if the segment exists in the db
        const partnerInDb = await this.partnerRepo.findOne({ where: { companyNumber } });
        if (partnerInDb) {
            throw new HttpException('Partner already exists', HttpStatus.BAD_REQUEST);
        }

        const partner: PartnerEntity = await this.partnerRepo.create({
            companyNumber, companyName
        });

        await this.partnerRepo.save(partner);

        return partner;
    }

    async destoryPartner(id: string): Promise<PartnerDto> {
        const partner: PartnerEntity = await this.partnerRepo.findOne({
            where: { id },
        });

        if (!partner) {
            throw new HttpException(
                `Partner list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.partnerRepo.delete({ id }); // delete partner list
        return partner;
    }

    async getOnePartner(id: string): Promise<PartnerDto> {
        const partner = await this.partnerRepo.findOne({
            where: { id },
        });

        if (!partner) {
            throw new HttpException(
                `Partner list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return partner;
    }

    async updatePartner(id: string, partnerDto: PartnerDto): Promise<PartnerEntity> {
        let partner: PartnerEntity = await this.partnerRepo.findOne({ where: { id } });
        if (!partner) {
            throw new HttpException(
                `Partner list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.partnerRepo.update({ id }, partnerDto); // update

        partner = await this.partnerRepo.findOne({
            where: { id },
        }); // re-query

        return partner;
    }
}

