const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note, Tag } = require("../../db/models");

const router = express.Router();

const validateTag = [
	check("name")
		.exists({ checkFalsy: true })
		.isLength({ max: 20, min: 1 })
		.withMessage("Name must be between 1 and 20 characters long"),
	handleValidationErrors,
];

router.get(
	"/:userId(\\d+)/tags",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.userId, 10);
		const tags = await Tag.findAll({
			where: { userId },
			order: [["updatedAt", "DESC"]],
		});
		res.json(tags);
	})
);

router.post(
	"/:userId(\\d+)/tags",
	requireAuth,
	validateTag,
	asyncHandler(async (req, res) => {
		const userId = parseInt(req.params.userId, 10);

		// {name: 'New Tag', color: 'c84639'}
		const { name, color } = req.body;

		const newTag = await Tag.create({
			userId,
			name,
			color,
		});

		res.json(newTag);
	})
);

router.put(
	"/tags/:tagId(\\d+)",
	requireAuth,
	validateTag,
	asyncHandler(async (req, res) => {
		const tagId = parseInt(req.params.tagId, 10);
		const { name, color } = req.body;

		const tagToUpdate = await Tag.findByPk(tagId);

		tagToUpdate.name = name;
		tagToUpdate.color = color;

		await tagToUpdate.save();

		res.json(tagToUpdate);
	})
);

module.exports = router;
