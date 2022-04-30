"use strict";
module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define(
		"Note",
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 255],
				},
			},
			content: DataTypes.TEXT,
			notebookId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			trash: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
		},
		{}
	);
	Note.associate = function (models) {
		Note.belongsTo(models.Notebook, { foreignKey: "notebookId" });
		Note.belongsToMany(models.Tag, {
			through: "JoinNoteTag",
			otherKey: "tagId",
			foreignKey: "noteId",
		});
		Note.hasOne(models.Favorite, { foreignKey: "noteId" });
	};
	return Note;
};
