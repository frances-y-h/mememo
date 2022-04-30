"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Notes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING(255),
			},
			content: {
				type: Sequelize.TEXT,
			},
			notebookId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Notebooks" },
			},
			trash: {
        allowNull: false,
				type: Sequelize.BOOLEAN,
        defaultValue: false,
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
		return queryInterface.dropTable("Notes");
	},
};
