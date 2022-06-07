import {
    Controller,
    Get,
    Req,
    Param,
    Post,
    Body,
    Delete,
    Put
  } from '@nestjs/common';
  import { ProductsService } from './products.service'
  import { ProductListDto } from './dto/product.list.dto';
  import { CreateProductDto } from './dto/product.create.dto';
  import { ProductDto } from './dto/product.dto';
  
  
  @Controller('api/products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Get()
    async findAll(@Req() req: any): Promise<ProductListDto> {
      const products = await this.productsService.getAllProducts();
      return { products };
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ProductDto> {
      return await this.productsService.getOneProduct(id);
    }
  
    @Delete(':id')
    async destory(@Param('id') id: string): Promise<ProductDto> {
      return await this.productsService.destoryProduct(id);
    }
  
    @Post()
    async create(
      @Body() createProductDto: CreateProductDto,
    ): Promise<ProductDto> {
      return await this.productsService.createProduct(createProductDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() productDto: ProductDto,
    ): Promise<ProductDto> {
        return await this.productsService.updateProduct(id, productDto);
    }

  }
  