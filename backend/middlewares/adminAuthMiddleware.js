// import jwt from "jsonwebtoken";

// function adminAuthMiddleware(req, res, next) {
//   try {
//     const token = req.cookies.access-token; // If using cookies instead of headers
//     if (!token) {
//       return next(403, "Unauthorized");
//     }
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     if (decodedToken.user === "admin") {
//       req.user = decodedToken;
//       next();
//     } else {
//       return next(403, "Unauthorized");
//     }
//   } catch (err) {
//     next(500, err.message || "Internal Server Error");
//   }
// }

// export { adminAuthMiddleware };

import jwt from "jsonwebtoken";

function adminAuthMiddleware(req, res, next) {
  try {
    // Read token from cookies
    const token = req.cookies["access-token"];
    if (!token) {
      const err = new Error("Unauthorized");
      err.statusCode = 403;
      return next(err);
    }
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role === "admin") {
      req.user = decodedToken;
      next();
    } else {
      const err = new Error("Unauthorized");
      err.statusCode = 403;
      return next(err);
    }
  } catch (err) {
    const error = new Error(err.message || "Internal Server Error");
    error.statusCode = 500;
    next(error);
  }
}

export { adminAuthMiddleware };
