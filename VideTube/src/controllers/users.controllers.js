import { AsyncHandler } from "../utils/AsyncHandler.js";
import { APIERROR } from "../utils/APIERROR.js";
import User from "../models/User.model.js";

const registerUser = AsyncHandler(async (req, res) => {
  // TODO
  const { fullName, email, password, username } = req.body;
  // validations
  if ([fullName, email, password, username].some((field) => field?.trim() === "")) {
    throw new APIERROR(400, "All fields are required to fill");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new APIERROR(409, "User with given email or username already exists!!");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
});

export { registerUser };
