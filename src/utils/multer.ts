import multer from "multer";

/**
 * MULTER CONFIGURATION
 * Configures how incoming files are handled before being uploaded to Cloudinary.
 * Using diskStorage temporarily saves the file to the server's disk.
 */
const storage = multer.diskStorage({
  // Specify the filename for the temporarily stored file
  filename: function (req, file, cb) {
    // Keeping the original name for simplicity before it gets uploaded to Cloudinary
    cb(null, file.originalname);
  },
});

/**
 * MULTER INSTANCE
 * Exports the configured multer instance to be used as middleware in routes.
 */
const upload = multer({ storage: storage });

export default upload;
