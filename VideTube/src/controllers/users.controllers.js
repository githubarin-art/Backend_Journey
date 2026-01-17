import { AsyncHandler } from "../utils/AsyncHandler.js";
import { APIError } from "../utils/APIError.js";
import User from "../models/users.models.js";
import { APIResponse } from "../utils/APIResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = AsyncHandler(async (req, res) => {
  // TODO
  const { fullName, email, password, username } = req.body || {};
  // validations: ensure fields exist and are not just whitespace
  if (
    [fullName, email, password, username].some(
      (field) => !field || (typeof field === "string" && field.trim() === "")
    )
  ) {
    throw new APIError(400, null, "All fields are required to fill");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new APIError(409, null, "User with given email or username already exists!!");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath || !coverImageLocalPath)
    throw new APIError(400, null, "Avatar and Cover Image are required");
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar || !avatar.url) {
    throw new APIError(500, null, "Avatar upload failed. Please try again.");
  }
  let coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!coverImage) coverImage = ""; // in this case we can leave it empty.

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username,
  });

  const checkUser = await User.findById(user._id).select("-password -reFreshToken");

  if (!checkUser) throw new APIError(500, null, "Unable to create user. Please try again later.");

  return res.status(201).json(new APIResponse(201, checkUser, "User registered successfully"));
});

export { registerUser };
