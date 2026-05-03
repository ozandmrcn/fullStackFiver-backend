import { NextFunction, Request, Response } from "express";

/**
 * ASYNC ERROR WRAPPER (CATCH ASYNC)
 * Higher-order function that wraps asynchronous Express route handlers.
 * It eliminates the need for repeated try-catch blocks by automatically
 * catching any rejected promises and passing the error to the global error handler middleware.
 */
type FunctionType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync = (fn: FunctionType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Execute the async function and catch any errors, forwarding them to next()
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
