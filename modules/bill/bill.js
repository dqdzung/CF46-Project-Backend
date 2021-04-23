const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
	items: [{ type: mongoose.Types.ObjectId, ref: "item" }],
	total: { type: Number },
});

module.exports = mongoose.model("bill", BillSchema);
