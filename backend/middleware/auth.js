const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncErrors = require('./catchAsyncErrors.js');
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Fixed path and removed duplicates

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    // Use JWT_SECRET or fallback to ACTIVATION_SECRET
    const decodedData = jwt.verify(token, process.env.JWT_SECRET || process.env.ACTIVATION_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});