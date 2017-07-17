const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    imageUrl: String,
    description: String,
});

const Category = mongoose.model("Category", schema);

module.exports = User;