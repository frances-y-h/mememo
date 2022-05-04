const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Notebook, Note } = require("../../db/models");

const router = express.Router();

const validateNotebook = [
	check("name")
		.exists({ checkFalsy: true })
		.isLength({ min: 1, max: 255 })
		.withMessage("Notebook name must be between 1 and 255 characters"),
	handleValidationErrors,
];

router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const userId = req.user.id;
		const notebooks = await Notebook.findAll({
			where: { userId },
		});
		// send out array of notebooks
		res.json(notebooks);
	})
);

router.post(
	"/",
	requireAuth,
	validateNotebook,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const { name } = req.body;

		const notebook = await Notebook.create({ userId, name });

		res.json(notebook);
	})
);

router.patch(
	"/:notebookId(\\d+)",
	requireAuth,
	validateNotebook,
	asyncHandler(async (req, res) => {
		const notebookId = parseInt(req.params.notebookId, 10);
		const { name } = req.body;

		const notebookToUpdate = await Notebook.findByPk(notebookId);

		notebookToUpdate.name = name;

		const notebook = await notebookToUpdate.save();

		res.json(notebook);
	})
);

router.delete(
	"/:notebookId(\\d+)",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const userId = req.user.id;
		const notebookId = parseInt(req.params.notebookId, 10);
		const firstNotebook = await Notebook.findAll({
			where: { userId },
			order: [["id", "ASC"]],
			limit: 1,
		});

		// make sure the notebook being deleted is note the primary notebook (first notebook)
		if (notebookId !== firstNotebook[0].id) {
			// move all notes with current notebookId to trash and unassociate notebook that will be destroy
			const notes = await Note.findAll({ where: { notebookId } });

			for (let i = 0; i < notes.length; i++) {
				let note = notes[i];
				note.notebookId = firstNotebook[0].id;
				note.trash = true;
				await note.save();
			}

			const notebookToDestory = await Notebook.destroy({
				where: { id: notebookId },
			});

			res.json(notebookId);
		} else {
			const err = new Error("Cannot delete primary notebook");
			next(err);
		}
	})
);

module.exports = router;
