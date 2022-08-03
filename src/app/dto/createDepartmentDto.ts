import { IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    public name: string;
}

export class UpdateDepartmentDto {

    @IsString()
    public name: string;
}