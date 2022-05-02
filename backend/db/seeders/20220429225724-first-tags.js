"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Tags",
			[
				{ name: "Pokemon", color: "473335", userId: 1 },
				{ name: "Anime", color: "e9d6af", userId: 1 },
				{ name: "Elden Ring", color: "32687a", userId: 1 },
				{ name: "Animal Crossing", color: "32687a", userId: 2 },
				{ name: "A/a Open", color: "32687a", userId: 2 },
				{ name: "Leet Code", color: "32687a", userId: 2 },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Tags", null, {});
	},
};
