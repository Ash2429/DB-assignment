import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { isString } from "util";

export class CreateAddressDto {    
    @IsString()
    public addressline1: string;
    
    @IsString()
    public addressline2: string;

    @IsString()
    public city: string;

    @IsString()
    public state: string;

    @IsString()
    public zipcode: string;
}
export class UpdateAddressDto {
    @IsOptional()
    @IsUUID()
    public id: string;

    @IsOptional()
    @IsString()
    public addressline1: string;
    
    @IsOptional()
    @IsString()
    public addressline2: string;

    @IsOptional()
    @IsString()
    public city: string;

    @IsOptional()
    @IsString()
    public state: string;

    @IsOptional()
    @IsString()
    public zipcode: string;
}