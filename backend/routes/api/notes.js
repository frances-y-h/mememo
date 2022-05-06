const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note, Tag, JoinNoteTag } = require("../../db/models");

const router = express.Router();

const validateNotes = [
	check("title")
		.exists({ checkFalsy: true })
		.isLength({ min: 1, max: 255 })
		.withMessage("Title must be between 1 and 255 characters long"),
	handleValidationErrors,
];

// Get all not trashed notes for user
router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const userId = req.user.id;
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
	"/:noteId(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const noteId = parseInt(req.params.noteId, 10);
		const note = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});

		res.json(note);
	})
);

// add new note
router.post(
	"/new",
	requireAuth,
	validateNotes,
	asyncHandler(async (req, res) => {
		const { title, content, notebookId, trash, tagsArr } = req.body;
		const newNote = await Note.create({ title, content, notebookId, trash });
		const noteId = newNote.id;

		for (let i = 0; i < tagsArr.length; i++) {
			const tagId = tagsArr[i].id;
			await JoinNoteTag.create({ noteId, tagId });
		}
		const note = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});
		res.json(note);
	})
);

// update or move to trash
router.patch(
	"/:noteId(\\d+)",
	requireAuth,
	validateNotes,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
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

		noteToUpdate.trash = trash;
		if (trash === true) {
			const user = await User.findByPk(userId);
			user.favorite = user.favorite.filter((id) => id !== noteId);
			await user.save();
		}

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
