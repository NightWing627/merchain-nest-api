import { Module } from '@nestjs/common';
import { MallEntity } from './entity/mall.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MallsController } from './malls.controller';
import { MallsService } from './malls.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([MallEntity]),
    ],
    controllers: [MallsController],
    providers: [MallsService],
})
export class MallsModule { }
