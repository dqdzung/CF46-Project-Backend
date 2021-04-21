const jwt = require("jsonwebtoken");
const UserModel = require("../modules/auth/user");

const tokenAuth = async (req, res, next) => {
	const token = req.headers.authorization;

	try {
		if (!token) throw new Error("Empty token...");

		const decodedData = jwt.verify(token, process.env.TOKEN_KEY);
		const { userId } = decodedData;

		const foundUser = await UserModel.findById(userId).select("-password -__v");
		if (!foundUser) throw new Error("Can't find user");
		req.user = foundUser;

		next();
	} catch (err) {
		res.status(401).send({ success: 0, message: err.message });
	}
};

module.exports = { tokenAuth };
