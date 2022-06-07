import { IsNotEmpty } from 'class-validator';

export class PartnerDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    companyNumber: string;
    @IsNotEmpty()
    companyName: string;
    createdOn?: Date;
}
