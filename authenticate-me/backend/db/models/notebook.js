"use strict";
module.exports = (sequelize, DataTypes) => {
	const Notebook = sequelize.define(
		"Notebook",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 255],
				},
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{}
	);
	Notebook.associate = function (models) {
		Notebook.belongsTo(models.User, { foreignKey: "userId" });
		Notebook.hasMany(models.Note, { foreignKey: "notebookId" });
	};
	return Notebook;
};
