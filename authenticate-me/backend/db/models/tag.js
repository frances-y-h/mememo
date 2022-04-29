"use strict";
module.exports = (sequelize, DataTypes) => {
	const Tag = sequelize.define(
		"Tag",
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			color: {
				type: DataTypes.STRING,
				defaultValue: "777777",
			},
		},
		{}
	);
	Tag.associate = function (models) {
		Tag.belongsTo(models.User, { foreignKey: "userId" });
		Tag.belongsToMany(models.Note, {
			through: "JoinNoteTag",
			otherKey: "noteId",
			foreignKey: "tagId",
		});
	};
	return Tag;
};
