import { Router } from "express";
import { validateJobInput } from "../middleware/validationMiddleware.js";
import {
  CreateJob,
  GetAllJobs,
  GetSingleJob,
  DeleteJob,
} from "../controllers/jobController.js";
import upload from "../middleware/multerMiddleware.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const jobRouter = Router();

jobRouter
  .route("/")
  .get(GetAllJobs)
  .post(
    upload.single("companyIcon"),
    validateJobInput,
    authorizeAdmin,
    authenticateUser,
    CreateJob
  );
jobRouter.route("/:id").get(GetSingleJob).delete(DeleteJob);

export default jobRouter;
