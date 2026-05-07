const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop"); 
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");

router.post("/create-product", upload.array("images"), catchAsyncErrors(async (req, res, next) => {
    try {
        const { shopId } = req.body;
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid!", 400));
        }

        const files = req.files;
        // Fix: filename (lowercase n)
        const imageUrls = files.map((file) => `${file.filename}`);

        const productData = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            tags: req.body.tags,
            originalPrice: Number(req.body.originalPrice), // Convert to Number
            discountPrice: Number(req.body.discountPrice), // Convert to Number
            stock: Number(req.body.stock),                 // Convert to Number
            images: imageUrls,
            shopId: shopId,
            shop: shop,
        };

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            product,
        });

    } catch (error) {
        console.log("Backend Error:", error); 
        return next(new ErrorHandler(error.message, 400));
    }
}));

//get all products of a shop
router.get("/get-all-products-shop/:id",catchAsyncErrors(async(req,res,next) => {
    try {
        const products = await Product.find({ shopId: req.params.id });

        res.status(201).json({
            success: true,
            products,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message,400));
    }
}))

//delete product 
router.delete("/delete-shop-product/:id",catchAsyncErrors(async(req,res,next)=>{
    try {
        const productId = req.params.id

        const productData = await Product.findById(productId);

        productData.images.forEach((imageUrl) => {
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath,(err)=>{
                if(err){
                    console.log(err);
                }
            })
        });

        const product = await Product.findByIdAndDelete(productId);


        if(!product){
            return next(new ErrorHandler("Product not found with this id!",500))
        }

        res.status(201).json({
            success:true,
            message:"Product Deleted successfully",
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,400));
        
    }
}))

module.exports = router; 