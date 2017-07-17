const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
    description: String,
    // web page??? MAYBE
});

const Tool = mongoose.model("Tool", schema);

module.exports = Tool;