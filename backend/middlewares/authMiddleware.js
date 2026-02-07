import jwt from "jsonwebtoken";

function checkForAuthentication(req, res, next) {
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

    // Attach user info to request
    req.user = decodedToken;
    // Make sure your JWT payload includes `id` or `_id` so you can use it later

    next();
  } catch (err) {
    const error = new Error(err.message || "Internal Server Error");
    error.statusCode = 500;
    next(error);
  }
}

export { checkForAuthentication };
