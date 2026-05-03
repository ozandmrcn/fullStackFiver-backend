import { NextFunction, Response, Request } from "express";

/**
 * GLOBAL ERROR HANDLING MIDDLEWARE
 * This middleware catches all errors passed to next() throughout the application.
 * It formats the error response and logs details for debugging.
 */
const errorHandler = (
  err: { status?: number; message?: string; stack?: string },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Determine the HTTP status code and message. Default to 500 (Internal Server Error).
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message || "Something went wrong";

  // Log detailed error information to the console for developers.
  // In production, you might want to send this to a logging service like Sentry or Winston.
  console.error("Error Details:", {
    message: errMessage,
    status: errStatus,
    stack: err?.stack || "No stack trace available",
  });

  // Send a structured JSON response to the client.
  res.status(errStatus).json({
    // 'error' for server errors, 'fail' for client errors
    status: errStatus === 500 ? "error" : "fail",
    statusCode: errStatus,
    message: errMessage,
  });
  
  return;
};

export default errorHandler;
