import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { Garbage } from "../models/garbage.model.js";

const submitComplain = asyncHandler(async (req, res) => {
  try {
    const { address, comment } = req.body;
    console.log(req.body);

    if (!address) {
      throw new ApiError(400, "Address field required");
    }

    const garbageImageLocal = req.files?.garbageImage[0]?.path;
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
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong");
  }
});

const deleteComplain = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    if (!userId && !postId) {
      throw new ApiError(400, "something went wrong");
    }
    const post = await Garbage.findById(postId);

    if (!post) {
      throw new ApiError(500, "Somethig went wrong while deleting");
    }

    if (post.owner.toString() !== userId.toString()) {
      throw new ApiError(401, "Access Denied");
    }
    const deletePost = await Garbage.findByIdAndDelete(postId);

    if (!deletePost) {
      throw new ApiError(500, "something went wrong while deleting post");
    }

    return res
      .status(200)
      .json(new ApiResponse(201, deletePost, "Delete successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went Wrong");
  }
});

const getAllComplains = asyncHandler(async (_, res) => {
  const allGarbageComplains = await Garbage.find({});
  if (!allGarbageComplains.length) {
    throw new ApiResponse(200, "No complaints found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allGarbageComplains, "Successfully Fetched"));
});

export { submitComplain, deleteComplain, getAllComplains };
