const BillModel = require("./bill");

const getBills = async () => {
	const bills = await BillModel.find();

	return bills;
};

const getTableBill = async (tableId) => {
	const bill = await BillModel.findOne({ table: tableId });

	return bill;
};

const updateBill = async (tableId, data) => {
	const updatedBill = await BillModel.findOneAndUpdate(
		{ table: tableId },
		data,
		{
			new: true,
		}
	);

	return updatedBill;
};

const saveBill = async ({ items, total, table }) => {
	const newBill = await BillModel.create({
		items: items,
		total: total,
		table: table,
	});

	return newBill;
};

const deleteBill = async (tableId) => {
	const deleted = await BillModel.findOneAndDelete({ table: tableId });

	return deleted;
};

module.exports = { getBills, saveBill, getTableBill, updateBill, deleteBill };
