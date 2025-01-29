import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

import {
  submitComplain,
  deleteComplain,
  getAllComplains,
} from "../controllers/garbage.controller.js";

const router = Router();

// submit garbage report
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

// delete garbage report
router.route("/delete-garbage-post/:id").delete(verifyJWT, deleteComplain);

// fetch all garbage complains
router.route("/get-all-complains").get(getAllComplains);

export default router;
