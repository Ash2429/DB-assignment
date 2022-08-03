import { plainToClass } from "class-transformer";
import { NextFunction } from "express";
import { getConnection } from "typeorm/globals";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../Repo/departmentRepo";
import RequestWithUser from "../util/rest/request";

export class DepartmentService{
    constructor(private DepartmentRepo: DepartmentRespository ){

    }
async getAllDepartments(){
    return await this.DepartmentRepo.getAllDepartments();
}


public async createDepartment(DepartmentDetails: any) {
    try {
        const newDepartment = plainToClass(Department, {
            name: DepartmentDetails.name,
            id: DepartmentDetails.id,
            isActive: true,
        });
        const save = await this.DepartmentRepo.saveDepartmentDetails(newDepartment);
        return save;
    } catch (err) {
        // throw new HttpException(400, "Failed to create Department");
    }
}

public async updateDepartment(id:string , DepartmentDetails: any) {
    const DepartmentRepo = getConnection().getRepository(Department);
    const updateDepartmentDetails = await DepartmentRepo.update({ id, deletedAt: null }, DepartmentDetails
    );
    return updateDepartmentDetails;
}
public async deleteDepartment(id: string) {
    const DepartmentRepo = getConnection().getRepository(Department);
    return DepartmentRepo.softDelete({
        id
    });
} 
}
