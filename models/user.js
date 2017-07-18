const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
        type: String,
		required: true,
		unique: true
    },
	username: String,
	password: {
        type: String,
        required: true
    },
	imageUrl: {
		type: String,
		default: 'http://learnonline.canberra.edu.au/theme/image.php/uc/core/1499280925/u/f1'
	},
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