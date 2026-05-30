const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/error'); 
const path = require("path");

const app = express();

// 1. LOAD ENV VARIABLES FIRST
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: path.resolve(__dirname, 'config/.env') 
    });
}

// 2. MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use("/", express.static(path.join(__dirname, "../uploads")));
app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));

// 3. IMPORT ROUTES (Must happen AFTER dotenv)
const user = require('./controller/user');
const shop = require('./controller/shop');
const product = require('./controller/product');
const event = require("./controller/event");
const coupon = require("./controller/couponCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");

// 4. USE ROUTES
app.use('/api/v1/user', user);
app.use('/api/v1/conversation', conversation); 
app.use('/api/v1/message', message); 
app.use('/api/v1/order', order);
app.use('/api/v1/shop', shop);
app.use('/api/v1/product', product);
app.use('/api/v1/event', event);
app.use('/api/v1/coupon',coupon)
app.use('/api/v1/payment',payment)

app.use(errorMiddleware); 

module.exports = app;