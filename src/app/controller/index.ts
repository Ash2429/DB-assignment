/**
 * Wraps Controllers for easy import from other modules
 */
import { DepartmentRespository } from "../Repo/departmentRepo";
import { EmployeeRespository } from "../Repo/employeeRepo";
import { EmployeeService } from "../service/EmployeeService";
import EmployeeController from "./EmployeeController";
import { DepartmentService } from "../service/DepartmentServices";
import DepartmentController from "./DepartmentController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
  new DepartmentController(new DepartmentService(new DepartmentRespository())),
];