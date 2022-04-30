const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const notebooksRouter = require("./notebooks.js");
const notesRouter = require("./notes.js");
const tagsRouter = require("./tags.js");
const trashRouter = require("./trash.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/", notebooksRouter);
router.use("/", notesRouter);
router.use("/", tagsRouter);
router.use("/", trashRouter);

module.exports = router;
