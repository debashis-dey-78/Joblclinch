import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

// Get platform stats
export const getPlatformStats = catchAsyncErrors(async (req, res, next) => {
  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();
  
  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalJobs
    }
  });
});

// Get all users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Delete a user
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  });
});

// Get all jobs (platform-wide)
export const getAllJobsAdmin = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find();
  res.status(200).json({
    success: true,
    jobs,
  });
});

// Delete any job
export const deleteJobAdmin = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted successfully!",
  });
});
