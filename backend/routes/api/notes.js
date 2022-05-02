const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note, Tag, JoinNoteTag } = require("../../db/models");

const router = express.Router();

// Get all not trashed notes for user
router.get(
	"/:userId(\\d+)/notes",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const userId = parseInt(req.params.userId, 10);
		const notes = await Note.findAll({
			include: [
				{
					model: Notebook,
					where: { userId },
				},
				{ model: Tag },
			],
			where: { trash: false },
			order: [["updatedAt", "DESC"]],
		});
		// notes as array
		res.json(notes);
	})
);

// Get note based on note id
router.get(
	"/notes/:noteId(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const noteId = parseInt(req.params.noteId, 10);
		const note = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});

		res.json(note);
	})
);

router.patch(
	"/notes/:noteId(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const noteId = parseInt(req.params.noteId, 10);
		const { title, content, notebookId, trash, tagsArr } = req.body;

		const noteToUpdate = await Note.findByPk(noteId);

		if (title) {
			noteToUpdate.title = title;
		}

		if (content) {
			noteToUpdate.content = content;
		}

		if (notebookId) {
			noteToUpdate.notebookId = notebookId;
		}

		if (trash) {
			noteToUpdate.trash = trash;
		}

		console.log(tagsArr);

		if (tagsArr) {
			// get the ids of the tags
			let newArr = tagsArr.map((tag) => tag.id);

			// turn it to set for time complexity
			let newSet = new Set(newArr);

			// Loop through current tags array to make sure they exists
			for (let i = 0; i < newArr.length; i++) {
				let tagId = newArr[i];
				const join = await JoinNoteTag.findOne({ where: { tagId, noteId } });
				if (!join) {
					await JoinNoteTag.create({ tagId, noteId });
				}
			}

			// loop through join table to remove any that does not exist in newArr/newSet
			const JoinNoteTags = await JoinNoteTag.findAll({ where: { noteId } });

			for (let j = 0; j < JoinNoteTags.length; j++) {
				let currentTag = JoinNoteTags[j];
				if (!newSet.has(currentTag.tagId)) {
					await currentTag.destroy();
				}
			}
		}

		await noteToUpdate.save();

		const note = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});

		res.json(note);
	})
);

module.exports = router;
