import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
