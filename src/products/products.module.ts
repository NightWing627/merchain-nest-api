import { Module } from '@nestjs/common';
import { ProductEntity } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([ProductEntity]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule { }
