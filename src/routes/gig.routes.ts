import express from "express";
import { getAllGigs, getGig, createGig, deleteGig } from "../controllers/gig.controller.js";
import protect from "../middlewares/protect.js";
import upload from "../utils/multer.js";

/**
 * GIG ROUTER
 * Manages all routes related to services (gigs).
 * Includes public listing, detail view, and protected creation/deletion.
 */
const router = express.Router();

/**
 * ROUTES DEFINITION
 */

router
  .route("/")
  // GET /api/gigs - Publicly list all gigs (with optional filters in query params)
  .get(getAllGigs)
  // POST /api/gigs - Create a new gig (authenticated sellers only)
  .post(
    protect, // Verify authentication
    // Handle multiple file fields: 1 cover image and up to 6 gallery images
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    createGig
  );

router
  .route("/:id")
  // GET /api/gigs/:id - View detailed info for a specific gig
  .get(getGig)
  // DELETE /api/gigs/:id - Remove a gig (authenticated owner only)
  .delete(protect, deleteGig);

export default router;
