import * as express from "express";

/**
 * EXPRESS TYPE AUGMENTATION
 * Extends the default Express Request interface to include custom properties
 * that are attached by our middlewares (like the 'protect' middleware).
 */
declare global {
  namespace Express {
    interface Request {
      // Explicitly define common properties used for authentication
      headers: { authorization?: string } & Headers;
      cookies: { token?: string };
      
      // Custom properties added during JWT verification
      userId?: string; // The authenticated user's unique ID
      isSeller?: boolean; // Flag indicating if the user has a seller account
    }
  }
}
