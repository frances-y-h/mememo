"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("JoinNoteTags", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			noteId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Notes" },
			},
			tagId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Tags" },
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("JoinNoteTags");
	},
};
