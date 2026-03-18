const express = require("express");
const router = express.Router();
const fs = require("fs");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken"); 

router.post("/create-shop", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password, address, phoneNumber, zipCode } = req.body;

      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        if (req.file) {
          fs.unlinkSync(`uploads/${req.file.filename}`);
        }
        return next(new ErrorHandler("Seller already exists", 400));
      }

      const filename = req.file.filename;
      const fileUrl = filename;

      const seller = await Shop.create({
        name,
        email,
        password,
        avatar: fileUrl,
        address,
        phoneNumber,
        zipCode,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login shop

router.post("/login-shop", catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler('Please provide email and password', 400));
        }

        const seller = await Shop.findOne({ email }).select("+password");

        if (!seller) {
            return next(new ErrorHandler('Seller not found', 404)); // Changed 'User' to 'Seller'
        }

        const isPasswordMatched = await seller.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }

        // Use the Shop-specific token utility
        sendShopToken(seller, 201, res);
        
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));
module.exports = router;