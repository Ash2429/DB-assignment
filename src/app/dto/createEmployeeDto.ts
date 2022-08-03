import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { isString } from "util";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public status: string;
    
    @IsString()
    public address: string;

    @IsString()
    public DateOfJoining: string;

    @IsString()
    public role: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;
}

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public status: string;
    
    @IsOptional()
    @IsString()
    public address: string;

    @IsOptional()
    @IsString()
    public DateOfJoining: string;

    @IsOptional()
    @IsString()
    public role: string;

    @IsOptional()
    @IsNumber()
    public experience: number;

    @IsOptional()
    @IsString()
    public departmentId: string;
}

export class verifyparamDto{
    @IsUUID()
    public id : string;
}