import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import gigRoutes from "./routes/gig.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { config, isDevelopment } from "./config/enviroment.js";

/**
 * DATABASE CONNECTION
 * Establishes a connection to MongoDB using the URI from environment variables.
 * Includes basic logging for connection status and error handling.
 */
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("🔥 Connection to Database Successful 🔥" + " " + config.MONGO_URI))
  .catch((error) => {
    console.log("😡 Connection to Database Failed 😡");
    // Log error details only in development mode for security
    if (isDevelopment) {
      console.log(error);
    }
  });

/**
 * INITIALIZE EXPRESS APP
 */
const app = express();
app.set("trust proxy", 1);

/**
 * MIDDLEWARE CONFIGURATION
 */

// Configure Cross-Origin Resource Sharing (CORS)
// Allows frontend to communicate with the backend from different origins
app.use(
  cors({
    origin: [
      config.CROSS_ORIGIN ? config.CROSS_ORIGIN.replace(/\/$/, "") : "",
      "https://fullstackfiver-frontend.vercel.app",
      "http://localhost:5173"
    ].filter(Boolean),
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Built-in middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Middleware to parse Cookie header and populate req.cookies
app.use(cookieParser());

/**
 * DEVELOPMENT TOOLS
 * Logging middleware to track incoming requests during development
 */
if (isDevelopment) {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

/**
 * HEALTH CHECK ROUTE
 * Basic endpoint to verify if the server is running correctly
 */
app.get("/", (req, res) => {
  res.json({ message: "Backend is alive...", date: new Date().toLocaleDateString("en-US") });
});

/**
 * API ROUTES
 * Registering various domain-specific routes
 */
app.use("/api/auth", authRoutes); // Authentication routes (register, login, etc.)
app.use("/api/gigs", gigRoutes); // Gig/Service related routes

/**
 * ERROR HANDLING MIDDLEWARE
 * This must be the last middleware in the stack
 * Catches all errors thrown from controllers or other middlewares
 */
app.use(errorHandler);

/**
 * SERVER INITIALIZATION
 * Start listening for incoming connections on the specified port
 */
app.listen(config.PORT, () => {
  console.log(`🎾 Server started listening on port ${config.PORT} 🎾`);
});
