import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { Garbage } from "../models/garbage.model.js";

const submitComplain = asyncHandler(async (req, res) => {
  const { address, comment } = req.body;

  if (!address) {
    throw new ApiError(400, "Address field required");
  }

  const garbageImageLocal = req.files?.images[0]?.path;
  if (!garbageImageLocal) {
    throw new ApiError(404, "Garbage image is required");
  }
  const images = await uploadCloudinary(garbageImageLocal);

  const garbage = await Garbage.create({
    address,
    comment: comment || "",
    images: images.url || "",
    owner: req.user._id,
  });
  const createdGarbage = await Garbage.findById(garbage._id);
  if (!createdGarbage) {
    throw new ApiError(
      500,
      "Something went wrong while submission garbage report"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdGarbage, "Complain Submission Successfully")
    );
});

export { submitComplain };
