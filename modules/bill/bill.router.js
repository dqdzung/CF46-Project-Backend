const express = require("express");
const BillController = require("./bill.controller");

const Router = new express.Router();

Router.get("/", async (req, res) => {
	try {
		const bills = await BillController.getBills();

		res.send({
			success: 1,
			data: bills,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

Router.get("/:tableId", async (req, res) => {
	const { tableId } = req.params;

	try {
		const found = await BillController.getTableBill(tableId);

		res.send({
			success: 1,
			data: found,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

Router.post("/", async (req, res) => {
	try {
		const data = req.body;
		const { table, items, total } = data;

		const found = await BillController.getTableBill(table);

		if (!found) {
			const newBill = await BillController.saveBill(data);

			return res.send({
				success: 1,
				data: newBill,
			});
		}

		const bill = await BillController.updateBill(table, {
			table,
			items,
			total,
		});

		return res.send({
			success: 1,
			data: bill,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

Router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const deletedBill = await BillController.deleteBill(id);

		return res.send({
			success: 1,
			data: deletedBill,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

module.exports = Router;
