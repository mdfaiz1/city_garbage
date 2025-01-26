import mongoose, { Schema } from "mongoose";

const garbageSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    images: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Garbage = mongoose.model("Garbage", garbageSchema);
