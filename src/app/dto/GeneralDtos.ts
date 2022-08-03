import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
export class verifyparamDto{
    @IsUUID()
    public id : string;
}