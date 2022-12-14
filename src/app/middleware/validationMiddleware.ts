import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request } from "express";
import * as express from "express";
import HttpException from "../exception/HttpException";
import APP_CONSTANTS from "../constants";
import { ErrorCodes } from "../util/errorCode";


/**
 * Middleware to validate the request.
 * Validations are performed using class validator
 */
function validationMiddleware<T>(type: any, parameter: string, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    if (parameter=="body"){
      const requestBody = plainToClass(type, req.body);
    validate(
      requestBody, { skipMissingProperties, forbidUnknownValues: true, whitelist: true })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const errorDetail = ErrorCodes.VALIDATION_ERROR;
          next(new HttpException(400, errorDetail.MESSAGE, errorDetail.CODE, errors));
          // next(errors);
        } else {
            req.body = requestBody;
          next();
        }
      });
    }
    if (parameter=="params")
    {
      const requestPar: any = plainToClass(type, req.params);
    validate(
      requestPar, { skipMissingProperties, forbidUnknownValues: true, whitelist: true })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {

const errorDetail = ErrorCodes.VALIDATION_ERROR;
next(new HttpException(400, errorDetail.MESSAGE, errorDetail.CODE, errors));
          next(errors);
        } else {
            req.params= requestPar;
          next();
        }
      });
    }
    
  };
}
export default validationMiddleware;
