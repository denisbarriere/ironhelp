const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: String,
	//   username: String, MAYBE
	password: String,
	//   imageUrl: String, MAYBE
	role: {
		type: String,
		enum: ['USER', 'ADMIN'],
		default: 'USER'
	}
}, {
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;