import { Module } from '@nestjs/common';
import { PartnerEntity } from './entity/partner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.services';

@Module({
    imports: [
        TypeOrmModule.forFeature([PartnerEntity]),
    ],
    controllers: [PartnersController],
    providers: [PartnersService],
})
export class PartnersModule { }
