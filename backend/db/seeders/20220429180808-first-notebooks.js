"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Notebooks",
			[
				{ name: "First Notebook", userId: 1 },
				{ name: "First Notebook", userId: 2 },
				{ name: "First Notebook", userId: 3 },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Notebooks", null, {});
	},
};
