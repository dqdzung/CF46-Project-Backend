const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
	items: [],
	table: { type: Number },
	total: { type: Number },
});

module.exports = mongoose.model("bill", BillSchema);
