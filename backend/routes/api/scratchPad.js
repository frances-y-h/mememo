const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

router.put(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		// come in as string
		let { scratchPad } = req.body;

		const user = await User.findByPk(userId);

		user.scratchPad = scratchPad;

		await user.save();
		res.json(scratchPad);
	})
);

module.exports = router;
