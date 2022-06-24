const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, (error, con) => {
    error ? console.log(error) : console.log(`Connection establish with database: ${con.host}`);
});