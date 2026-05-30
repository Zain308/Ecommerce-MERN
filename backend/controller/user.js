const express = require("express");
const fs = require("fs");
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const { isAuthenticatedUser } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const router = express.Router();

// 1. Create User (Direct Registration - No Email Required)
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        // Delete uploaded file to keep storage clean if registration fails
        if (req.file) {
          const filePath = `uploads/${req.file.filename}`;
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        }
        return next(new ErrorHandler("User already exists", 400));
      }

      if (!req.file) {
        return next(new ErrorHandler("Please upload an avatar", 400));
      }

      const fileUrl = req.file.filename;

      // Create user directly in MongoDB
      const user = await User.create({
        name,
        email,
        password,
        avatar: fileUrl,
      });

      // Generate Token and Login automatically (this sends the cookie)
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// 2. Login User
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// 3. Get User (For Persistent Login)
router.get(
  "/getuser",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  }),
);

// logout user
router.get(
  "/logout",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).json({
        success: true,
        message: "Log out Successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

//update user info
router.get(
  "/update-user-info",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }.select("+password"));

      if (!user) {
        return next(
          new ErrorHandler("Please provide the correct information", 400),
        );
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400),
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = user.phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {}
  }),
);

//update user avatar
router.put(
  "/update-avatar",
  isAuthenticatedUser,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existUser = await User.findById(req.user.id);

      const existAvatarPath = `uploads/${existUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {}
  }),
);

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType,
      );

      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`),
        );
      }

      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id,
      );

      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }
      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {}
  }),
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        {
          $pull: {
            address: { _id: addressId },
          },
        },
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);


// update user password
router.put(`/update-user-password`,isAuthenticatedUser,catchAsyncErrors(async(req,res,next)=>{
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
      return(next(new ErrorHandler("Old password is incorrect!",400)))
    }
    
    if(req.body.newPassword!== req.body.confirmPassword){
      return(next(new ErrorHandler("Password does not matched with each other",400)))
    }

    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message,500))
  } 
}))

// find user information with the user id
router.get("/user-info/:id",catchAsyncErrors(async(req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({
      success:true,
      user,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message,500))
  }
}))


module.exports = router;
