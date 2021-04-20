const UserModel = require("./user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const doExist = async (string) => {
	return await UserModel.findOne({ email: string });
};

const createUser = async ({ email, password }) => {
	const foundUser = await doExist(email);

	if (foundUser) throw new Error("Email's already been used!");

	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);

	const newUser = await UserModel.create({
		email: email,
		password: hashPassword,
	});

	return newUser;
};

const login = async ({ email, password }) => {
	const foundUser = await doExist(email);

	if (!foundUser) throw new Error("User not found!");

	const hashPassword = foundUser.password;
	const comparePassword = bcrypt.compareSync(password, hashPassword);

	if (!comparePassword) throw new Error("Wrong password");

	const data = { userId: foundUser._id };
	const token = jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: "1h" });

	return { user: foundUser, token };
};

module.exports = { createUser, login };
