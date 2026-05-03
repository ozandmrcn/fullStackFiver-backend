import { Types, Schema, model } from "mongoose";

/**
 * GIG INTERFACE
 */
export interface IGig {
  _id: string;
  user: Types.ObjectId;
  title: string;
  description: string;
  reviewCount: number;
  starCount: number;
  category: string;
  coverImage: string;
  images: string[];

  packageTitle: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: string[];
  packageDuration: number;
  packageRevisions: number;

  createdAt: string;
  updatedAt: string;
}

/**
 * GIG SCHEMA (FIXED)
 */
const gigSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      minLength: [15, "Description must be at least 15 characters"],
      maxLength: [500, "Description cannot exceed 500 characters"],
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    starCount: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },

    // 🔥 FIX: artık zorunlu değil + default var
    packageTitle: {
      type: String,
      required: false,
      default: "",
    },

    packageDescription: {
      type: String,
      required: false,
      default: "",
    },

    packagePrice: {
      type: Number,
      required: true,
    },

    packageFeatures: {
      type: [String],
      required: true,
    },

    packageDuration: {
      type: Number,
      required: false,
      default: 0,
    },

    packageRevisions: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Gig = model("Gig", gigSchema);
