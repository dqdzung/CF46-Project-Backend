const mongoose = require("mongoose");
const ItemModel = require("./item");

const createItem = async ({ name, price }) => {
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
	const updatedItem = ItemModel.findByIdAndUpdate(
		id,
		{ name: name, price: price },
		{ new: true }
	);

	return updatedItem;
};

const deleteItem = async (id) => {
	deletedItem = ItemModel.findByIdAndDelete(id);

	return deletedItem;
};
