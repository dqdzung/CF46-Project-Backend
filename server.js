const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 9000;

mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			return console.log("MongoDB Server error", err);
		}
		console.log("MongoDB Server connected...");
	}
);

app.get("*", (req, res) => {
	res.status(404).send({
		success: 0,
		message: "There's nothing here, look somewhere else",
	});
});

app.listen(PORT, (err) => {
	if (err) {
		return console.log("Server Error", err);
	}
	console.log(`Server started at port ${PORT}...`);
});
