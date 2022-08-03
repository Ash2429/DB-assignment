import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import { Address } from "../entities/Address";
import { UpdateEmployeeDto } from "../dto/EmployeeDto";
import { UpdateAddressDto } from "../dto/addressDto";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return await employeeRepo.find();
    }
    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    public async softRemoveEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employee=await this.getEmployeeById(id,['address']);
        return employeeRepo.softRemove(employee);
    }
    public async updateEmployeeDetails(employeeDetails: Employee) {
        const EmployeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await EmployeeRepo.save(employeeDetails);
        return updateEmployeeDetails;
    }
    public async getEmployeeByName(name: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name },
        });
        return employeeDetail;
    }
    public async deleteEmployeeDetails(employee:Employee) {
        const EmployeeRepo = getConnection().getRepository(Employee);
        return EmployeeRepo.softRemove(employee);
    }
    public async getEmployeeById(id:string, relations:string[]=['department','address']){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id,{ relations:relations});
    }
    // public async getAddressId(id:string){
    //     const employeeRepo = getConnection().getRepository(Employee);
    //     return employeeRepo.findOne(id=id);
    // }
    }