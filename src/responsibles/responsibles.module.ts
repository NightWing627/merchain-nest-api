import { Module } from '@nestjs/common';
import { ResponsibleEntity } from './entity/responsible.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsiblesController } from './responsibles.controller';
import { ResponsiblesService } from './responsibles.service';
@Module({
    imports: [
      TypeOrmModule.forFeature([ResponsibleEntity]),
    ],
    controllers: [ResponsiblesController],
    providers: [ResponsiblesService],
  })
export class ResponsiblesModule {}
