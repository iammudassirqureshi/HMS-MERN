import User from "../schemas/User.js";
import errorResponse from "../utils/errorResponse.js";
import { asyncHandler } from "../middleware/asyncMiddleware.js";
import { parsedUser } from "../utils/tokenResponse.js";

export const register = asyncHandler(async (req, res, next) => {
  try {
    // check if user exists
    const existinUser = await User.findOne({ email: req.body.email });
    if (existinUser) {
      return next(
        new errorResponse("User already exists", 400, {
          type: "EmailAlreadyExists",
        })
      );
    }

    req.body.picture = req.file ? req.file.filename : "";
    const user = await User.create(req.body);
    if (!user) {
      return next(new errorResponse("User not created", 400));
    }

    res
      .status(201)
      .cookie("token", user.token)
      .json({
        success: true,
        message: "User registered successfully",
        token: user.token,
        data: parsedUser(user),
      });
  } catch (error) {
    console.error(error);
    return next(new errorResponse("Server error", 500));
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return next(new errorResponse("Please provide email and password", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new errorResponse("Invalid credentials", 401));

    const isPasswordMatched = await user.matchPassword(password);
    if (!isPasswordMatched)
      return next(new errorResponse("Invalid credentials", 401));

    res
      .status(200)
      .cookie("token", user.token)
      .json({
        success: true,
        message: "User logged in successfully",
        token: user.token,
        data: parsedUser(user),
      });
  } catch (error) {
    console.error(error);
    return next(new errorResponse("Server error", 500));
  }
});

export const logout = asyncHandler(async (req, res, next) => {
  try {
    req.user.token = "";
    await req.user.save();
    res
      .status(200)
      .clearCookie("token")
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return next(new errorResponse("Server error", 500));
  }
});