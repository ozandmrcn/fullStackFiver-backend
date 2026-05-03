import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { LoginReq, RegisterReq } from "../types/index.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import upload from "../utils/cloudinary.js";
import c from "../utils/catch-async.js";
import e from "../utils/error.js";
import { config, isProduction } from "../config/enviroment.js";

/**
 * REGISTER CONTROLLER
 * Handles new user account creation.
 * Processes password hashing, avatar upload to Cloudinary, and database storage.
 */
const register = c(async (req: RegisterReq, res: Response, next: NextFunction): Promise<void> => {
  // Salt and hash the password for security before saving it to the database
  const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

  // Upload the user's profile picture ONLY if a file was provided
  let profilePicture;
  if (req.file) {
    const image = await upload(req.file.path, "avatars", 200, 200, "fill", "auto");
    profilePicture = image.secure_url;
  }

  // Create a new user record
  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
    // If profilePicture is undefined, Mongoose will use the default value defined in the schema
    profilePicture,
  });

  // Respond to the client with success message and user data
  res.json({ message: "Account created successfully", user: newUser });
});

/**
 * LOGIN CONTROLLER
 * Authenticates an existing user.
 * Verifies credentials, generates a JWT, and sets it as an HTTP-only cookie.
 */
const login = c(async (req: LoginReq, res: Response, next: NextFunction): Promise<void> => {
  // Search for the user by their unique username
  const user = await User.findOne({
    username: req.body.username,
  });

  // If user doesn't exist, return a 404 error via error middleware
  if (!user) {
    return next(e(404, "Invalid login credentials"));
  }

  // Compare the provided plain-text password with the stored hashed password
  const isPassCorrect: boolean = bcrypt.compareSync(req.body.password, user.password);

  // If passwords don't match, return error
  if (!isPassCorrect) {
    return next(e(404, "Invalid login credentials"));
  }

  // If authentication is successful, sign a JSON Web Token (JWT)
  // Payload contains user ID and seller status
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES,
  });

  // Send the token in an HTTP-only cookie for better security (XSS protection)
  res
    .cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      secure: true, // Always true for Cloud Run HTTPS
      sameSite: "none", // Always none for cross-domain Vercel frontend
      expires: new Date(Date.now() + 14 * 24 * 3600 * 1000), // Set cookie expiry (14 days)
    })
    .json({ message: "Login successful", user });
});

/**
 * LOGOUT CONTROLLER
 * Ends the user session by clearing the authentication cookie.
 */
const logout = c(async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }).status(200).json({
    message: "Successfully logged out",
  });
});

/**
 * GET PROFILE CONTROLLER
 * Retrieves the currently authenticated user's profile information.
 * Uses the user ID attached to the request object by the 'protect' middleware.
 */
const getProfile = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Query the database for the user using the ID from the request object
  const user = await User.findById(req.userId);

  // Handle case where user might have been deleted or token is invalid
  if (!user) {
    return next(e(404, "User not found"));
  }

  // Return user data to the client
  res.status(200).json({
    message: "Profile data retrieved successfully",
    user,
  });
});

export { register, login, logout, getProfile };
