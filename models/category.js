const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    imageUrl: {
        type: String,
        default: 'http://bulma.io/images/placeholders/128x128.png'
    },
    description: String,
});

const Category = mongoose.model("Category", schema);

module.exports = Category;