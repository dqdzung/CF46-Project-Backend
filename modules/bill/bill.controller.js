const BillModel = require("./bill");

const getBills = async () => {
	const bills = await BillModel.find();

	return bills;
};

const saveBill = async (items, total) => {
	const newBill = await BillModel.create({
		items: items,
		total: total,
	});
};
