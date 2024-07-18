import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "Authentication invalid. No token provided.",
    });
  }
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication invalid. Token is not valid.",
    });
  }
};
export const authorizeAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId, role } = verifyJWT(token);
    if (role !== "admin") {
      return res.status(401).json({
        message: "You need to be an admin to perform operation.",
      });
    }
  }
  next();
};
