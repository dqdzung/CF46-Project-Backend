const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, require: true },
	role: { type: String, require: true },
});

module.exports = mongoose.model("user", UserSchema);
