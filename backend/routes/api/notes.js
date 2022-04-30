const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Notebook, Note } = require("../../db/models");

const router = express.Router();

router.get("/:userId(\\d+)/notes", requireAuth, asyncHandler(async(req,res,next) => {
  const userId = parseInt(req.params.userId, 10);
  const notes = await Note.findAll({
    include: [{
      model: Notebook,
      where: { userId }
    }],
    where: { trash: false }
  })
  // notes as array
  res.json(notes)
}))

module.exports = router;
