import { Schema, model } from "mongoose";
import { defaultProfile } from "../utils/constants.js";

/**
 * USER INTERFACE
 * TypeScript representation of a User document in MongoDB.
 */
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  country: string;
  isSeller: boolean;
  phone?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * USER SCHEMA
 * Mongoose schema definition for the User collection.
 * Includes strict validation for unique fields and sensitive data protection.
 */
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true, // Ensure username is unique across all users
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true, // Ensure email is unique across all users
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    profilePicture: {
      type: String,
      default: defaultProfile, // Fallback if no picture is uploaded
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    // Automatically track creation and update times
    timestamps: true,

    /**
     * TOJSON TRANSFORM
     * Customizes how the document is converted to JSON when sent to the client.
     * Crucial for security: removes sensitive fields like 'password'.
     */
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id; // Map _id to a cleaner 'id' property
        delete ret.password; // Never send the hashed password to the client
        delete ret._id; // Hide the internal MongoDB ID
        delete ret.__v; // Hide the version key
        return ret;
      },
    },
  }
);

// Create and export the User model
const User = model<IUser>("User", userSchema);

export default User;
