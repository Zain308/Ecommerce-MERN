const express = require('express');
const fs = require('fs'); 
const { upload } = require('../multer');
const User = require('../model/user'); 
const ErrorHandler = require('../utils/ErrorHandler'); 
const sendToken = require('../utils/jwtToken');
const { isAuthenticatedUser } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors'); 

const router = express.Router();

// 1. Create User (Direct Registration - No Email Required)
router.post('/create-user', upload.single('file'), catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            // Delete uploaded file to keep storage clean if registration fails
            if (req.file) {
                const filePath = `uploads/${req.file.filename}`;
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
            return next(new ErrorHandler('User already exists', 400));
        }

        if (!req.file) {
            return next(new ErrorHandler('Please upload an avatar', 400));
        }

        const fileUrl = req.file.filename;

        // Create user directly in MongoDB
        const user = await User.create({
            name,
            email,
            password,
            avatar: fileUrl
        });

        // Generate Token and Login automatically (this sends the cookie)
        sendToken(user, 201, res);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// 2. Login User
router.post("/login-user", catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler('Please provide email and password', 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }

        sendToken(user, 201, res);
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// 3. Get User (For Persistent Login)
router.get("/getuser", isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new ErrorHandler("User doesn't exist", 400));
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}));


// logout user
router.get("/logout", isAuthenticatedUser, catchAsyncErrors(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(0), 
            httpOnly: true,
            sameSite: "none",
            secure: true,   
        });

        res.status(200).json({ 
            success: true,
            message: "Log out Successful!"
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

module.exports = router;