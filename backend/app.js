const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/error'); 

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use("/", express.static('uploads')); 
app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: 'backend/config/.env' 
    });
}

// import all routes here
const user = require('./controller/user');

// FIXED: Changed '/api/v1' to '/api/v1/user' 
// This matches your frontend call: ${server}/user/login-user
app.use('/api/v1/user', user);

app.use(errorMiddleware); 

module.exports = app;