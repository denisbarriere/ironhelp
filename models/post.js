const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    tool: { type: Schema.Types.ObjectId, ref: 'Tool' },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

schema.set('timestamps', true);

const Post = mongoose.model('Post', schema);

module.exports = Post;