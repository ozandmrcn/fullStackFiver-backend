import { NextFunction, Request, Response } from "express";
import e from "../utils/error.js";
import c from "../utils/catch-async.js";
import upload from "../utils/cloudinary.js";
import { ExtendedFiles, Filters, Query } from "../types";
import { Gig } from "../models/gig.model.js";

/**
 * FILTER BUILDER UTILITY
 * Converts raw query parameters from the request into a Mongoose-compatible filter object.
 * Handles categories, user IDs, price ranges (min/max), and text search with regex.
 */
const buildFilters = (query: Query): Filters => {
  const filters: Filters = {};

  // Exact match for category and user
  if (query.category) filters.category = query.category;
  if (query.userId) filters.user = query.userId;

  // Range query for price
  if (query.min || query.max) {
    filters.packagePrice = {};
    if (query.min) filters.packagePrice.$gte = query.min; // Greater than or equal
    if (query.max) filters.packagePrice.$lte = query.max; // Less than or equal
  }

  // Case-insensitive regex search for titles
  if (query.search) filters.title = { $regex: query.search, $options: "i" };

  return filters;
};

/**
 * GET ALL GIGS CONTROLLER
 * Fetches a list of gigs based on filters and populates user info.
 */
export const getAllGigs = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const filters = buildFilters(req.query);

    // Find gigs matching filters and include owner details (username and profile picture)
    const gigs = await Gig.find(filters).populate(
      "user",
      "username profilePicture",
    );

    // Handle empty result set
    if (gigs.length === 0)
      return next(e(404, "No services found matching your criteria"));

    res.status(200).json({
      message: "Gig data retrieved successfully",
      results: gigs.length,
      gigs,
    });
  },
);

/**
 * GET SINGLE GIG CONTROLLER
 * Fetches detailed information for a specific gig by its ID.
 */
export const getGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const gig = await Gig.findById(req.params.id).populate("user");

    if (!gig) return next(e(404, "Requested service not found"));

    res.status(200).json({
      message: "Gig data retrieved successfully",
      gig,
    });
  },
);

/**
 * CREATE GIG CONTROLLER
 * Handles new gig creation, including image uploads to Cloudinary.
 * Only sellers are authorized to create gigs.
 */
export const createGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Authorization check: Verify if the user is a seller
    if (!req.isSeller)
      return next(e(403, "Only seller accounts can create services"));

    // Cast files to custom type for easier access to multi-field uploads
    const files = req.files as unknown as ExtendedFiles;

    // Ensure files are provided
    if (!files || !files.coverImage || !files.images) {
      return next(
        e(400, "Please upload both a cover image and gallery images"),
      );
    }

    // Upload primary cover image to Cloudinary
    const coverImage = await upload(
      files.coverImage[0].path,
      "gig-images",
      900,
      600,
      "fill",
      "80",
    );

    // Prepare upload promises for additional gallery images
    const promises = files.images.map((image) =>
      upload(image.path, "gig-images", 900, 600, "fill", "80"),
    );

    // Execute all gallery uploads in parallel for performance
    const images = await Promise.all(promises);

    // Add the resulting Cloudinary URLs to the request body
    req.body.coverImage = coverImage.secure_url;
    req.body.images = images.map((image) => image.secure_url);

    // Parse comma-separated features string into an array
    req.body.packageFeatures = req.body.packageFeatures.split(",");

    // Create the new gig document associated with the current user
    const savedGig = await Gig.create({ ...req.body, user: req.userId });

    res.status(201).json({
      message: "Service created successfully",
      gig: savedGig,
    });
  },
);

/**
 * DELETE GIG CONTROLLER
 * Removes a gig from the database.
 * Requires the requester to be the owner of the gig.
 */
export const deleteGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Find the gig first to check ownership
    const gig = await Gig.findById(req.params.id);

    // Handle case where gig doesn't exist
    if (!gig) return next(e(404, "Requested service not found"));

    // Ownership verification: Ensure current user ID matches the gig creator's ID
    if (String(gig?.user) !== req.userId)
      return next(e(403, "You are not authorized to perform this action"));

    // Proceed with deletion
    await Gig.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Service removed successfully",
    });
  },
);
