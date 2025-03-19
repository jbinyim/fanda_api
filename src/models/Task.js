import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    // id는 자동생성

    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", TaskSchema);
