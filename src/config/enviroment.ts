import dotenv from "dotenv";

/**
 * ENVIRONMENT CONFIGURATION
 * Determines which .env file to load based on the NODE_ENV environment variable.
 * Default is development if not specified.
 */
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";

// Load the environment-specific .env file
dotenv.config({ path: envFile });

/**
 * FALLBACK LOAD
 * If the environment-specific file doesn't exist or doesn't define all variables,
 * this loads the default .env file as a fallback.
 */
dotenv.config();

/**
 * CONFIG OBJECT
 * Centralized configuration object for the entire application.
 * Extracts environment variables and provides default values or type casting.
 */
export const config = {
  // Application environment
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000"),

  // MongoDB connection string
  MONGO_URI: process.env.MONGO_URI as string,

  // Authentication settings
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES: parseInt(process.env.JWT_EXPIRES as string),

  // Cloudinary credentials for image uploads
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY as string,
  CLOUD_SECRET: process.env.CLOUD_SECRET as string,

  // Frontend URL for CORS configuration
  CROSS_ORIGIN: process.env.CROSS_ORIGIN || "http://localhost:5173",
};

/**
 * HELPER CONSTANTS
 * Boolean flags to easily check the current application state.
 */
export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
