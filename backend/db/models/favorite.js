"use strict";
module.exports = (sequelize, DataTypes) => {
	const Favorite = sequelize.define(
		"Favorite",
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			num: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 99,
				},
			},
			noteId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{}
	);
	Favorite.associate = function (models) {
		Favorite.belongsTo(models.User, { foreignKey: "userId" });
		Favorite.belongsTo(models.Note, { foreignKey: "noteId" });
	};
	return Favorite;
};
