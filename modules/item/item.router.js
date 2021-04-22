const express = require("express");
const item = require("./item");
const ItemController = require("./item.controller");

const Router = new express.Router();

Router.get("/", async (req, res) => {
	try {
		const items = await ItemController.getAll();

		res.send({
			success: 1,
			data: items,
		});
	} catch (err) {
		res.status(500).send({ success: 0, message: err.message });
	}
});

Router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const item = await ItemController.getOne(id);

		res.send({
			success: 1,
			data: item,
		});
	} catch (err) {
		res.status(500).send({ success: 0, message: err.message });
	}
});

Router.post("/", async (req, res) => {
	try {
		const { name, price } = req.body;

		const newItem = await ItemController.addItem({ name, price });

		res.send({
			success: 1,
			data: newItem,
		});
	} catch (err) {
		res.status(500).send({ success: 0, message: err.message });
	}
});

Router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name, price } = req.body;

		const updatedItem = await ItemController.editItem(id, { name, price });

		res.send({
			success: 1,
			message: "Updated",
			data: updatedItem,
		});
	} catch (err) {
		res.status(500).send({ success: 0, message: err.message });
	}
});

Router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const deletedItem = await ItemController.deleteItem(id);

		res.send({
			success: 1,
			message: "Deleted",
			data: deletedItem,
		});
	} catch (err) {
		res.status(500).send({ success: 0, message: err.message });
	}
});

module.exports = Router;
