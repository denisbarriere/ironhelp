const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
        type: String,
        required: true
    },
	username: String,
	password: {
        type: String,
        required: true
    },
	profileImageUrl: String,
	role: {
		type: String,
		enum: ['GUEST', 'USER', 'ADMIN'],
		default: 'USER'
	}
}, {
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;