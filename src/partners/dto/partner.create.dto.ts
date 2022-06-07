import { IsNotEmpty } from 'class-validator';
export class CreatePartnerDto {
    @IsNotEmpty()
    companyNumber: string;
    @IsNotEmpty()
    companyName: string;
}
