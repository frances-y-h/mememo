"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"JoinNoteTags",
			[
				{ noteId: 1, tagId: 1 },
				{ noteId: 1, tagId: 2 },
				{ noteId: 1, tagId: 3 },
				{ noteId: 4, tagId: 4 },
				{ noteId: 2, tagId: 1 },
				{ noteId: 2, tagId: 2 },
				{ noteId: 2, tagId: 3 },
				{ noteId: 3, tagId: 1 },
				{ noteId: 3, tagId: 2 },
				{ noteId: 3, tagId: 3 },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("JoinNoteTags", null, {});
	},
};
