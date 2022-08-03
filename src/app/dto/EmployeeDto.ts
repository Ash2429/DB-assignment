import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { isString } from "util";
import { CreateAddressDto ,UpdateAddressDto} from "./addressDto";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public status: string;

    @IsString()
    public DateOfJoining: string;

    @IsString()
    public role: string;

    @IsNumber()
    public experience: number;
    
    @IsUUID()
    public departmentId: string;
    
    @ValidateNested()
    @Type(() => CreateAddressDto)
    public address: CreateAddressDto

   
    @IsString()
    public password:string
}

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    public id: string;

    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public status: string;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateAddressDto)
    public address: UpdateAddressDto;

    @IsOptional()
    @IsString()
    public dateOfJoining: string;

    @IsOptional()
    @IsString()
    public role: string;

    @IsOptional()
    @IsNumber()
    public experience: number;

    @IsOptional()
    @IsUUID()
    public departmentId: string;

    @IsOptional()
    @IsString()
    public password:string
}