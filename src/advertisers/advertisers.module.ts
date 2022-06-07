import { Module } from '@nestjs/common';
import { AdvertisersEntity } from './entity/advertisers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisersController } from './advertisers.controller';
import { AdvertisersService } from './advertisers.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([AdvertisersEntity]),
    ],
    controllers: [AdvertisersController],
    providers: [AdvertisersService],
})
export class AdvertisersModule { }
