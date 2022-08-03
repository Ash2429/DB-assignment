import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository{
    async getAllDepartments(){
         const departmentRepo = getConnection().getRepository(Department);
        return await departmentRepo.find();
    }
    public async saveDepartmentDetails(DepartmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(DepartmentDetails);
    }
    }