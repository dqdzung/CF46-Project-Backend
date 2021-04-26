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

module.exports = { getBills, saveBill, getTableBill, updateBill };
