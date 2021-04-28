const express = require("express");
const { tokenAuth } = require("../../middleware/tokenAuth");
const AuthController = require("./auth.controller");

const Router = new express.Router();

Router.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body;

		const newUser = await AuthController.createUser({
			email: email,
			password: password,
		});

		res.send({
			success: 1,
			data: newUser,
		});
	} catch (err) {
		res.status(500).send({ success: 0, message: err.message });
	}
});

Router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await AuthController.login({ email, password });

		res.send({
			success: 1,
			data: user,
		});
	} catch (err) {
		res.status(500).send({ success: 0, message: err.message });
	}
});

Router.get("/user", tokenAuth, async (req, res) => {
	try {
		const user = req.user;
		res.send({ success: 1, data: user });
	} catch (err) {
		res.send({ success: 0, message: err.message });
	}
});

module.exports = Router;
