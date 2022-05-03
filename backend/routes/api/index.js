const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const notebooksRouter = require("./notebooks.js");
const notesRouter = require("./notes.js");
const tagsRouter = require("./tags.js");
const trashRouter = require("./trash.js");
const padRouter = require("./scratchPad.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/trash", trashRouter);
router.use("/notebooks", notebooksRouter);
router.use("/notes", notesRouter);
router.use("/tags", tagsRouter);
router.use("/scratchpad", padRouter);

module.exports = router;
