"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "demo@user.io",
					username: "DemoUser",
					hashedPassword: bcrypt.hashSync("password"),
					avatarUrl: "/images/logo.svg",
					scratchPad: "Hello world!",
					favorite: [1, 2],
				},
				{
					email: "user1@user.io",
					username: "FakeUser1",
					hashedPassword: bcrypt.hashSync("password"),
					avatarUrl: "/images/logo.svg",
				},
				{
					email: "user2@user.io",
					username: "FakeUser2",
					hashedPassword: bcrypt.hashSync("password"),
					avatarUrl: "/images/logo.svg",
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			"Users",
			{
				username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
			},
			{}
		);
	},
};
