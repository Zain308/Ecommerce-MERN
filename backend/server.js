const app = require('./app.js');
const connectDatabase = require('./db/database.js');

// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
});


// config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: 'backend/config/.env' 
    });
}

// connecting to database
connectDatabase();


// create server

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
}
);