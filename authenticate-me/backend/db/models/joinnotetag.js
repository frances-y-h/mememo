"use strict";
module.exports = (sequelize, DataTypes) => {
	const JoinNoteTag = sequelize.define(
		"JoinNoteTag",
		{
			noteId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			tagId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{}
	);
	JoinNoteTag.associate = function (models) {
		// associations can be defined here
	};
	return JoinNoteTag;
};
