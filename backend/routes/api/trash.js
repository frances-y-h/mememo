const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Note, Tag, Notebook, JoinNoteTag } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const trash = await Note.findAll({
			include: [
				{
					model: Notebook,
					where: { userId },
				},
				Tag,
			],
			where: { trash: true },
			order: [["updatedAt", "DESC"]],
		});
		// trash as array
		res.json(trash);
	})
);

router.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const toBeDeletedNotes = await Note.findAll({
			include: [
				{
					model: Notebook,
					where: { userId },
				},
				Tag,
			],
			where: { trash: true },
		});

		// delete tags
		for (let i = 0; i < toBeDeletedNotes.length; i++) {
			const note = toBeDeletedNotes[i];
			const noteId = note.id;
			if (note.Tags.length > 0) {
				for (let j = 0; j < note.Tags.length; j++) {
					let tagId = note.Tags[j].id;
					await JoinNoteTag.destroy({ where: { tagId, noteId } });
				}
			}
		}

		//delete notes
		await Note.destroy({
			include: [
				{
					model: Notebook,
					where: { userId },
				},
			],
			where: { trash: true },
		});

		res.json({ message: "success" });
	})
);

// const response = await csrfFetch(`/api/${userId}/trash`, {
// 	method: "DELETE",
// 	body: JSON.stringify(trashIdArr),
// });

module.exports = router;
