const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure to npm install bcryptjs
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, 
    },
    phoneNumber: {
        type:Number,
    },
    addresses:[
        {
            country:{
                type:String,
            },
            city:{
                type:String,
            },
            address1:{
                type:String,
            },
            zipCode:{
                type:Number,
            },
            addressType:{
                type:String,
            },
        }
    ],
    role:{
        type:String,
    },
    avatar: {
        type: String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    resetPasswordToken:String,
    resetPasswordTime:Date,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;