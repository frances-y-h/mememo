const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note, Tag } = require("../../db/models");

const router = express.Router();

// Get all notes for user
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
		const { title, content, notebookId } = req.body;

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

		await noteToUpdate.save();

		const note = await Note.findByPk(noteId, {
			include: [Tag, Notebook],
		});

		res.json(note);
	})
);

module.exports = router;
