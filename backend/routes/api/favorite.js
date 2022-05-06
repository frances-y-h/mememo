const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const user = await User.findByPk(userId);

		res.json(user);
	})
);

router.post(
	"/:noteId(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const noteId = parseInt(req.params.noteId, 10);
		const user = await User.findByPk(userId);
		const newFav = [...user.favorite];
		// check if it is there before unshift
		if (!newFav.some((id) => id === noteId)) {
			newFav.unshift(noteId);
		}
		user.favorite = newFav;
		await user.save();

		res.json(noteId);
	})
);

router.delete(
	"/:noteId(\\d+)",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const noteId = parseInt(req.params.noteId, 10);
		const user = await User.findByPk(userId);
		const newFav = user.favorite.filter((id) => id !== noteId);
		user.favorite = newFav;
		await user.save();

		res.json(noteId);
	})
);

module.exports = router;
