import { Router } from "express";
import {
  Login,
  Register,
  Logout,
  verifyToken,
} from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
const authRouter = Router();

authRouter.post("/login", validateLoginInput, Login);
authRouter.post("/register", validateRegisterInput, Register);
authRouter.post("/logout", Logout);
authRouter.get("/verifyToken", authenticateUser, verifyToken);

export default authRouter;
