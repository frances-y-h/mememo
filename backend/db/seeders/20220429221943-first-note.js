"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Notes",
			[
				{
					title: "First Note",
					content: "My first memo!",
					notebookId: 1,
					trash: false,
				},
				{
					title: "Second Note",
					content: "My second memo!",
					notebookId: 1,
					trash: false,
				},
				{
					title: "Third Note",
					content: "My third memo!",
					notebookId: 1,
					trash: true,
				},
				{
					title: "First Note from User 2",
					content: "Wow my notes!",
					notebookId: 2,
					trash: false,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Notes", null, {});
	},
};
