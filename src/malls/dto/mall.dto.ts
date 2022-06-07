import { IsNotEmpty, IsOptional } from 'class-validator';

export class MallDto {
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    name: string;

    @IsOptional()
    fantasiaName: string;
    @IsOptional()
    companyName: string;
    @IsOptional()
    companyNumber: string;
    @IsOptional()
    companyPhone: string;
    @IsOptional()
    address: string;
    @IsOptional()
    shoppingNumber: number;
    @IsOptional()
    neighborhood: string;
    @IsOptional()
    city: string;
    @IsOptional()
    state: string;
    @IsOptional()
    partners: Array<string>;
    @IsOptional()
    financialId: string;
    @IsOptional()
    legalId: string;
    @IsOptional()
    createdOn?: Date;
    avartar: string;
}
