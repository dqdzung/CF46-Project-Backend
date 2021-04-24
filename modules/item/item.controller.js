const mongoose = require("mongoose");
const ItemModel = require("./item");

const addItem = async ({ name, price, imgUrl, type }) => {
	const newItem = ItemModel.create({
		name: name,
		price: price,
		type: type,
		imgUrl: imgUrl,
	});

	return newItem;
};

const getAll = async () => {
	const foundItems = ItemModel.find().select("-__v");

	return foundItems;
};

const getOne = async (id) => {
	const foundOne = ItemModel.findById(id);

	return foundOne;
};

const editItem = async (id, data) => {
	const updatedItem = ItemModel.findByIdAndUpdate(id, data, { new: true });

	return updatedItem;
};

const deleteItem = async (id) => {
	const deletedItem = ItemModel.findByIdAndDelete(id);

	return deletedItem;
};

module.exports = { addItem, getAll, editItem, deleteItem, getOne };
