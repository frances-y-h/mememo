const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook } = require("../../db/models");

const router = express.Router();

router.get(
	"/:userId(\\d+)/notebooks",
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const userId = parseInt(req.params.userId, 10);
		const notebooks = await Notebook.findAll({
			where: { userId },
			order: [["updatedAt", "DESC"]],
		});
		// send out array of notebooks
		res.json(notebooks);
	})
);

module.exports = router;
