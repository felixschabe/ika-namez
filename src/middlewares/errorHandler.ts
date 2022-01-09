import { ExpressJoiError } from "express-joi-validation";
import { NextFunction, Request, Response } from "express";
import { createDefaultApiResponse } from "../utils/utils";

export default (
  err: any | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.error) {
    if (err.error.isJoi) {
      return createDefaultApiResponse(res, true, err.error.toString(), 500);
    }
  }
  if (err.type) {
    return createDefaultApiResponse(res, true, err.type, 500);
  }
  return createDefaultApiResponse(res, true, "crazy error", 500);
};
