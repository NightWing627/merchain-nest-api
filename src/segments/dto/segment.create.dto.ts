import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
export class CreateSegmentDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @MaxLength(500)
    description?: string;
}
