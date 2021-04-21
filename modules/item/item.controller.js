const mongoose = require("mongoose");
const ItemModel = require("./item");

const addItem = async ({ name, price }) => {
	const newItem = ItemModel.create({
		name: name,
		price: price,
	});

	return newItem;
};

const getItems = async () => {
	const foundItems = ItemModel.find().select("-__v");

	return foundItems;
};

const editItem = async (id, { name, price }) => {
	let data;
	if (!name) data = { price: price };
	if (!price) data = { name: name };
	if (name && price) data = { name: name, price: price };

	const updatedItem = ItemModel.findByIdAndUpdate(id, data, { new: true });

	return updatedItem;
};

const deleteItem = async (id) => {
	deletedItem = ItemModel.findByIdAndDelete(id);

	return deletedItem;
};

module.exports = { addItem, getItems, editItem, deleteItem };