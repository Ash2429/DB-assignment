import { plainToClass } from "class-transformer";
import { NextFunction } from "express";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../Repo/employeeRepo";
import { ErrorCodes } from "../util/errorCode";
import RequestWithUser from "../util/rest/request";

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository ){

    }
async getAllEmployees(){
    return await this.employeeRepo.getAllEmployees();
}


public async createEmployee(employeeDetails: any) {
    try {
        const newEmployee = plainToClass(Employee, {
            name: employeeDetails.name,
            dateOfJoining: employeeDetails.DateOfJoining,
            role: employeeDetails.role,
            status: employeeDetails.status,
            experience: employeeDetails.experience,
            address: employeeDetails.address,
            isActive: true,
            departmentId:employeeDetails.departmentId
        });
        const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
        return save;
    } catch (err) {
        throw new HttpException(400, "Failed to create Employee","");
    }
}
public async updateEmployee( id:string,EmployeeDetails: any) {
    const EmployeeRepo = getConnection().getRepository(Employee);
    const updateEmployeeDetails = await EmployeeRepo.update({ id, deletedAt: null }, EmployeeDetails);
    console.log(updateEmployeeDetails)
    if (updateEmployeeDetails.affected==0){
        throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
    }
    return updateEmployeeDetails;
}
public async deleteEmployee(id: string) {
    const EmployeeRepo = getConnection().getRepository(Employee);
    return EmployeeRepo.softDelete({
        id
    });
}  
  
}