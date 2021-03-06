const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRouter = require("./modules/auth/auth.router");
const ItemRouter = require("./modules/item/item.router");
const BillRouter = require("./modules/bill/bill.router");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9000;

mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	(err) => {
		if (err) return console.log("MongoDB Server error", err);

		console.log("MongoDB Server connected...");
	}
);

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/item", ItemRouter);
app.use("/api/bill", BillRouter);

app.get("*", (req, res) => {
	res.status(404).send({
		success: 0,
		message: "There's nothing here, look somewhere else",
	});
});

app.listen(PORT, (err) => {
	if (err) return console.log("Server Error", err);

	console.log(`Server started at port ${PORT}...`);
});
