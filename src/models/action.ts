import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
  {
    trx_id: { type: String, unique: true },
    block_time: String,
    block_num: Number,
  },
  { timestamps: true }
);

export const Action = mongoose.model("Action", actionSchema);
