import mongoose, { Schema } from "mongoose";
import mongooseAggregratePaginate from "mongoose-aggregate-paginate-v2";
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
commentSchema.plugin(mongooseAggregratePaginate);
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
