import { Request } from "express";

/**
 * AUTHENTICATION TYPES
 */

// Structure of the request body for user registration
interface RegisterBody {
  username: string;
  email: string;
  password: string;
  country: string;
  isSeller?: boolean;
  profilePicture?: string;
  phone?: string;
  description?: string;
}

// Structure of the request body for user login
interface LoginBody {
  username: string;
  password: string;
}

// Specialized Express Request types for better type safety in controllers
type RegisterReq = Request<{}, {}, RegisterBody>;
type LoginReq = Request<{}, {}, LoginBody>;

/**
 * FILE UPLOAD TYPES
 */

// Represents the structure of 'req.files' when using multer with multiple fields (upload.fields)
type ExtendedFiles = {
  coverImage: { path: string }[]; // Primary cover image file info
  images: { path: string }[]; // Array of additional gallery image file info
};

/**
 * QUERY & FILTERING TYPES
 */

// Raw query parameters received from the URL (e.g., /api/gigs?category=design)
type Query = {
  category?: string;
  userId?: string;
  min?: string; // Minimum price (as string from query)
  max?: string; // Maximum price (as string from query)
  search?: string; // Search keyword
};

// Formatted filters used for Mongoose find() queries
type Filters = {
  category?: string;
  user?: string;
  packagePrice?: {
    $gte?: string; // Greater than or equal to
    $lte?: string; // Less than or equal to
  };
  title?: {
    $regex: string; // Regular expression for partial matches
    $options: string; // Regex options (e.g., 'i' for case-insensitive)
  };
};

export { RegisterReq, LoginReq, ExtendedFiles, Query, Filters };
