import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

/**
 * Get the token from cookies
 * No token present, then return error
 * Verify the cookie token with our JWT secret key
 * if token valid, then pass to next middleware
 */

export const verifyToken = (req, res, next) => {
    // getting the token from cookies
    const token = req.cookies.access_token;

    // if no token present in cookies respond with error
    if (!token) return next(errorHandler(401, "Unauthorized Access"));

    // verifying the token with our secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(errorHandler(403, "Forbidden"));
        
        // the 'user' object extracted from the token is attached to the 'req' object for use in subsequent middleware functions
        req.user = user;
        next();
    })
};