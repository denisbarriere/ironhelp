const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        default: 'http://bulma.io/images/placeholders/128x128.png'
    },
    description: String,
    website: String,
    documentation: String,
    github: String,
    technology: String,
});

const Tool = mongoose.model("Tool", schema);

module.exports = Tool;