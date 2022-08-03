import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import HttpException from "../exception/HttpException";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto,UpdateEmployeeDto } from "../dto/EmployeeDto";
import { verifyparamDto } from "../dto/GeneralDtos";
import authorize from "../middleware/loginmiddleware";
class EmployeeController extends AbstractController {
  constructor(private empService : EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
    
  }
  protected initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
       this.login
    );
    this.router.get(`${this.path}`,
      this.employeeResponse);
    this.router.post(
      `${this.path}`,
      authorize(["Admin","Submain","Hr"]),
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),

      this.asyncRouteHandler(this.createEmployee)
    );
    this.router.patch(`${this.path}/:id`,
    authorize(["Hr","Submain"]),
    validationMiddleware(verifyparamDto, APP_CONSTANTS.params),
      this.getEmployeeById
      );
    this.router.put(`${this.path}/:id`,
    authorize(["Admin","Submain"]),
      validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body),
      validationMiddleware(verifyparamDto, APP_CONSTANTS.params), 
      this.updateEmployee);

    this.router.delete(`${this.path}/:id`,
    authorize(["Admin"]), 
    validationMiddleware(verifyparamDto, APP_CONSTANTS.params),
    this.deleteEmployee);
  }
  private employeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      console.log("enter");
      const data: any= await this.empService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.empService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      throw new HttpException(400, 'Error', '');
    }
  }

  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.empService.updateEmployee(request.params.id , request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK",1)
      );
    } catch (err) {
      next(err);
    }
  }
  private getEmployeeById= async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.empService.getEmployeeById(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK",1)
      );
    } catch (err) {
      next(err);
    }
  }
  private deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.empService.deleteEmployee(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK",1)
      );
    } catch (err) {
      next(err);
    }
  }
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
    const loginData = request.body;
    const loginDetail = await this.empService.employeeLogin(
      loginData.name,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
    } catch (err) {
      next(err);
    }
  };
}
export default EmployeeController;
