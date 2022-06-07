import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
export class CreateMallDto {
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
    avartar: string;
}
