const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note, Tag, JoinNoteTag } = require("../../db/models");

const router = express.Router();

const validateTag = [
	check("name")
		.exists({ checkFalsy: true })
		.isLength({ max: 20, min: 1 })
		.withMessage("Name must be between 1 and 20 characters long"),
	handleValidationErrors,
];

router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const tags = await Tag.findAll({
			where: { userId },
			include: {
				model: Note,
				include: Tag,
			},
			order: [["updatedAt", "DESC"]],
		});
		res.json(tags);
	})
);

router.post(
	"/",
	requireAuth,
	validateTag,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;

		// {name: 'New Tag', color: 'c84639'}
		const { name, color } = req.body;

		const newTag = await Tag.create({
			userId,
			name,
			color,
		});

		const tag = await Tag.findByPk(newTag.id, {
			include: {
				model: Note,
				include: Tag,
			},
		});

		res.json(tag);
	})
);

router.put(
	"/:tagId(\\d+)",
	requireAuth,
	validateTag,
	asyncHandler(async (req, res) => {
		const tagId = parseInt(req.params.tagId, 10);
		const { name, color } = req.body;

		const tagToUpdate = await Tag.findByPk(tagId);

		tagToUpdate.name = name;
		tagToUpdate.color = color;

		await tagToUpdate.save();

		const tag = await Tag.findByPk(tagId, {
			include: {
				model: Note,
				include: Tag,
			},
		});

		res.json(tag);
	})
);

router.delete(
	"/:tagId(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const tagId = parseInt(req.params.tagId, 10);
		await JoinNoteTag.destroy({ where: { tagId } });

		// const tag = await Tag.findByPk(tagId);

		await Tag.destroy({ where: { id: tagId } });

		res.json(tagId);
	})
);

module.exports = router;
