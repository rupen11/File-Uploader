const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
});

mongoose.models = {};
module.exports = mongoose.model("imageuplaod", imageSchema);