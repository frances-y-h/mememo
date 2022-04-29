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
					avatarUrl:
						"https://img.freepik.com/free-vector/honey-comb-pattern_225004-641.jpg?t=st=1651206994~exp=1651207594~hmac=7b6665183684d0230ec73e90477cc28abf9f0261b5c0f002eee8e94d87f63240&w=1800",
				},
				{
					email: "user1@user.io",
					username: "FakeUser1",
					hashedPassword: bcrypt.hashSync("password2"),
					avatarUrl:
						"https://img.freepik.com/free-photo/close-up-wet-blue-petals_23-2148787371.jpg?t=st=1651207100~exp=1651207700~hmac=b48fe8c2c2e1b50324afcbf9019de372e8c25bd4cbe37e0e1ed7e354ea8df264&w=1800",
				},
				{
					email: "user2@user.io",
					username: "FakeUser2",
					hashedPassword: bcrypt.hashSync("password3"),
					avatarUrl:
						"https://img.freepik.com/free-photo/closeup-shot-blooming-pink-amaryllis-flowers-with-greenery_181624-33392.jpg?t=st=1651207124~exp=1651207724~hmac=02c0c382d11aa7d2d3ff89464046da2450b3a382f5fefe54ef9ed4c473b54745&w=1800",
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
