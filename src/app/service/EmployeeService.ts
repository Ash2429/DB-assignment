import { plainToClass } from "class-transformer";
import { NextFunction } from "express";
import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import { Address } from "../entities/Address";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../Repo/employeeRepo";
import { ErrorCodes } from "../util/errorCode";
import RequestWithUser from "../util/rest/request";
import bcrypt from "bcrypt";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import jsonwebtoken from "jsonwebtoken"
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/EmployeeDto";
import { CreateAddressDto ,UpdateAddressDto} from "../dto/addressDto";

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository ){

    }
async getAllEmployees(){
    return await this.employeeRepo.getAllEmployees();
}


public async createEmployee(employeeDetails:CreateEmployeeDto) {
    try {
        const newAddress = plainToClass(Address, {
          addressLine1: employeeDetails.address.addressline1,
          addressLine2: employeeDetails.address.addressline2,
          city: employeeDetails.address.city,
          state: employeeDetails.address.state,
          zipcode: employeeDetails.address.zipcode,
      });
        const newEmployee = plainToClass(Employee, {
            name: employeeDetails.name,
            dateOfJoining: employeeDetails.DateOfJoining,
            role: employeeDetails.role,
            status: employeeDetails.status,
            experience: employeeDetails.experience,
            isActive: true,
            address:newAddress,
            departmentId:employeeDetails.departmentId,
            password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
        });
        const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
        return save;
    } catch (err) {
        throw new HttpException(400, "Failed to create Employee","");
    }
}
public async updateEmployee( id:string , employeeDetails: UpdateEmployeeDto ) {
   const emp= (await this.employeeRepo.getEmployeeById(id))
    const newAddress = plainToClass(Address, {
      Id: emp.address.Id,
      addressLine1: employeeDetails.address.addressline1,
      addressLine2: employeeDetails.address.addressline2,
      city: employeeDetails.address.city,
      state: employeeDetails.address.state,
      zipcode: employeeDetails.address.zipcode,
  });
    const newEmployee = plainToClass(Employee, {
        id:id,
        name: employeeDetails.name,
        dateOfJoining: employeeDetails.dateOfJoining,
        role: employeeDetails.role,
        status: employeeDetails.status,
        experience: employeeDetails.experience,
        isActive: true,
        address:newAddress,
        departmentId:employeeDetails.departmentId,
        password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
    });
    const save = await this.employeeRepo.updateEmployeeDetails(newEmployee)
    return save;

}
public async getEmployeeById(id:string, relations:string[]=['department','address']){
  const employeeRepo = getConnection().getRepository(Employee);
  return await employeeRepo.findOne(id,{ relations:relations});
}

public async deleteEmployee(id: string) {
    const empl = await this.employeeRepo.getEmployeeById(id,["address"])
    const save = await this.employeeRepo.deleteEmployeeDetails(empl)
    return save;
}  
public employeeLogin = async (
    name: string,
    password: string
  ) => {
    const employeeDetails = await this.employeeRepo.getEmployeeByName(
      name
    );
    if (!employeeDetails) {
      throw new UserNotAuthorizedException(ErrorCodes.UserNotAuthorizedException);
    }
    const validPassword = await bcrypt.compare(password, employeeDetails.password);
    if (validPassword) {
      let payload = {
        "custom:id": employeeDetails.id,
        "role": employeeDetails.role,
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException(ErrorCodes.IncorrectUsernameOrPasswordException);
    }
  };

 private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };  
}