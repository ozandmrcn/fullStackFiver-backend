import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import e from "../utils/error.js";
import { config } from "../config/enviroment.js";

/**
 * AUTHENTICATION MIDDLEWARE (PROTECT)
 * Verifies the user's identity using a JWT token provided in cookies or the Authorization header.
 * If valid, it attaches the user's ID and seller status to the request object.
 */
const protect = (req: Request, res: Response, next: NextFunction): void => {
  // 1) Access the token from either the Authorization header (Bearer token) or the cookies.
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  // 2) If no token is found, deny access with a 403 Forbidden error.
  if (!token) {
    return next(e(403, "You are not authorized (Token not found)"));
  }

  // 3) If token exists, verify its integrity and expiration using the JWT secret.
  jwt.verify(token, config.JWT_SECRET as string, (err: any, payload: any) => {
    // 4) If the token is invalid or expired, return an error.
    if (err) {
      return next(e(403, "Your token is invalid or has expired"));
    }

    // 5) If verification is successful, extract user data from the token payload
    // and attach it to the 'req' object. This allows subsequent middlewares and 
    // controllers to access the authenticated user's information.
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    // 6) Proceed to the next middleware or controller in the stack.
    next();
  });
};

export default protect;
