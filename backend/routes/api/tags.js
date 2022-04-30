const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note, Tag } = require("../../db/models");

const router = express.Router();

router.get("/:userId(\\d+)/tags", requireAuth, asyncHandler(async(req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const tags = await Tag.findAll({where: { userId }});
  res.json(tags);
}))



module.exports = router;
