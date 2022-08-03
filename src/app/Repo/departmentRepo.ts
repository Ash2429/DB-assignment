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
    public async updateDepartmentDetails(DepartmentDetails: Department) {
        const DepartmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await DepartmentRepo.save(DepartmentDetails);
        return updateDepartmentDetails;
    }
    public async getDepartmentByName(name: string) {
        const DepartmentRepo = getConnection().getRepository(Department);
        const DepartmentDetail = await DepartmentRepo.findOne({
            where: { name },
        });
        return DepartmentDetail;
    }
    public async deleteDepartmentDetails(id:string) {
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.softDelete({
            id
        });
    }
    public async getDepartmentById(id:string, relations:string[]=['department','address']){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.findOne(id,{ relations:relations});
    }
    }
    