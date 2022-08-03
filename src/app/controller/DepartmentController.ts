import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentServices";
import { getConnection } from "typeorm";
import { Department } from "../entities/Department";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto,UpdateDepartmentDto } from "../dto/createDepartmentDto";
import { verifyparamDto } from "../dto/createEmployeeDto";

class DepartmentController extends AbstractController {
  constructor(private deptService : DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.DepartmentResponse);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createDepartment)
      this.createDepartment);
      this.router.put(
        `${this.path}/:id`,
        validationMiddleware(verifyparamDto, APP_CONSTANTS.body),
        validationMiddleware(UpdateDepartmentDto, APP_CONSTANTS.body),
        // this.asyncRouteHandler(this.createDepartment)
        this.updateDepartment
    );
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(verifyparamDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createDepartment)
      this.deleteDepartment
  );
  }
  private DepartmentResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.deptService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.deptService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK",1)
      );
    } catch (err) {
      next(err);
    }
  }
  private updateDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.deptService.updateDepartment(request.params.id ,request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK",1)
      );
    } catch (err) {
      next(err);
    }
  }
  private deleteDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.deptService.deleteDepartment(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK",1)
      );
    } catch (err) {
      next(err);
    }
  }
}
export default DepartmentController;