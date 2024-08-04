import { IsString, IsInt, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsString()
    readonly productCode: string;

    @IsString()
    readonly location: string;

    @IsInt()
    readonly price: number;

    @IsOptional()
    @IsString()
    readonly productDescription: string;
}
