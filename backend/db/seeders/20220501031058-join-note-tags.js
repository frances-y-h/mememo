"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"JoinNoteTags",
			[
				{ noteId: 1, tagId: 1 },
				{ noteId: 1, tagId: 2 },
				{ noteId: 1, tagId: 3 },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("JoinNoteTags", null, {});
	},
};
