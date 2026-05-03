/**
 * CUSTOM ERROR CREATOR
 * Utility function to generate a standard JavaScript Error object 
 * with an additional 'status' property for HTTP status codes.
 */
type ExtendedError = Error & { status: number };

const error = (status: number, message: string) => {
  // Create a new Error object with the provided message
  const err = new Error(message) as ExtendedError;

  // Attach the HTTP status code to the error object
  err.status = status;

  // Return the enhanced error object to be passed to next()
  return err;
};

export default error;
