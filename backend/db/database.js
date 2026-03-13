const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL)
    .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err) => {
        // Log the exact DB error so we can see it
        console.log(`Database Connection Error: ${err.message}`);
    });
}

module.exports = connectDatabase;