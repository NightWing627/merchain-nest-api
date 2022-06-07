import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/product.create.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>, ) { }

    async getAllProducts(): Promise<ProductDto[]> {
        const products = await this.productRepo.find();
        return products;
    }

    async createProduct(
        createProductDto: CreateProductDto,
    ): Promise<ProductDto> {
        const { name, productCode, shoppingId, quantity, period, location, price, techSpects, description, profileImage, dimensions } = createProductDto;
        // check if the segment exists in the db
        const productInDb = await this.productRepo.findOne({ where: { name } });
        if (productInDb) {
            throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);
        }

        const product: ProductEntity = await this.productRepo.create({
            name,
            productCode, shoppingId, quantity, period,
            location, price, techSpects, description,
            profileImage, dimensions
        });

        await this.productRepo.save(product);

        return product;
    }

    async destoryProduct(id: string): Promise<ProductDto> {
        const product: ProductEntity = await this.productRepo.findOne({
            where: { id },
        });

        if (!product) {
            throw new HttpException(
                `Product list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.productRepo.delete({ id }); // delete segment list
        return product;
    }

    async getOneProduct(id: string): Promise<ProductDto> {
        const product = await this.productRepo.findOne({
            where: { id },
        });

        if (!product) {
            throw new HttpException(
                `Product list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return product;
    }

    async updateProduct(id: string, productDto: ProductDto): Promise<ProductEntity> {
        let product: ProductEntity = await this.productRepo.findOne({ where: { id } });
        if (!product) {
            throw new HttpException(
                `Product list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.productRepo.update({ id }, productDto); // update

        product = await this.productRepo.findOne({
            where: { id },
        }); // re-query

        return product;
    }
}

