const ErrorHandler = require('../utils/ErrorHandler.js');
const catchAsyncErrors = require('./catchAsyncErrors.js');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Shop = require('../model/shop'); 

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    // Always use JWT_SECRET for logged-in sessions
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    const { seller_token } = req.cookies;

    if (!seller_token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET);
    
    // req.seller will now work because Shop is imported above
    req.seller = await Shop.findById(decoded.id);

    if (!req.seller) {
        return next(new ErrorHandler("Seller not found", 404));
    }

    next();
});