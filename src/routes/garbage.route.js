import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

import { submitComplain } from "../controllers/garbage.controller.js";

const router = Router();

router.route("/submit-garbage-report").post(
  verifyJWT,
  upload.fields([
    {
      name: "images",
      maxCount: 1,
    },
  ]),
  submitComplain
);

export default router;
