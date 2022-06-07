import { IsNotEmpty } from 'class-validator';

export class ProductDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    productCode: string;
    @IsNotEmpty()
    shoppingId: string;
    @IsNotEmpty()
    quantity: number;
    @IsNotEmpty()
    period: string;
    @IsNotEmpty()
    location: string;
    @IsNotEmpty()
    price: string;
    @IsNotEmpty()
    techSpects: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    profileImage: string;
    @IsNotEmpty()
    dimensions: string;
    createdOn?: Date;
}
