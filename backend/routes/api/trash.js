const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note } = require("../../db/models");

const router = express.Router();

router.get("/:userId(\\d+)/trash", requireAuth, asyncHandler(async( req, res ) => {
  const userId = parseInt(req.params.userId, 10);
  const trash = await Note.findAll({
    include: [{
      model: Notebook,
      where: { userId }
    }],
    where: { trash: true }
  })
  // trash as array
  res.json(trash)
}))

module.exports = router;
