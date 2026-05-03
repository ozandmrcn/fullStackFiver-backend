import express from "express";
import { register, login, logout, getProfile } from "../controllers/auth.controller.js";
import protect from "../middlewares/protect.js";
import upload from "../utils/multer.js";

/**
 * AUTHENTICATION ROUTER
 * Handles all routes related to user authentication and profile management.
 */
const router = express.Router();

/**
 * ROUTES DEFINITION
 */

// POST /api/auth/register - Handles user signup with an optional profile picture upload
router.route("/register").post(upload.single("profilePicture"), register);

// POST /api/auth/login - Authenticates a user and returns a session cookie
router.route("/login").post(login);

// POST /api/auth/logout - Clears the authentication cookie to end the session
router.route("/logout").post(logout);

// GET /api/auth/profile - Retrieves the current user's profile (requires authentication)
router.route("/profile").get(protect, getProfile);

export default router;
