import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    productCode: string;
    @IsNotEmpty()
    shoppingId: string;
    @IsNotEmpty()
    quantity: number;
    @IsOptional()
    period: string;
    @IsOptional()
    location: string;
    @IsOptional()
    price: string;
    @IsOptional()
    techSpects: string;
    @IsOptional()
    description: string;
    @IsOptional()
    profileImage: string;
    @IsOptional()
    dimensions: string;
}
