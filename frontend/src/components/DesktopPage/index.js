import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import * as notebooksActions from "../../store/notebooks";
import * as notesActions from "../../store/notes";
import * as tagsActions from "../../store/tags";
import * as trashActions from "../../store/trash";

import Navigation from "../Navigation";
import Desktop from "./desktop.js";
import NotesPage from "./notes.js";
import NotebooksPage from "./notebooks.js";
import TagsPage from "./tags.js";
import TrashPage from "./trash.js";
import "./Desktop.css";

const DesktopPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	// useEffect to get all notebooks
	useEffect(() => {
		if (sessionUser) {
			dispatch(notebooksActions.getAllNotebooks(sessionUser.id));
			dispatch(notesActions.getAllNotes(sessionUser.id));
			dispatch(tagsActions.getAllTags(sessionUser.id));
			dispatch(trashActions.getAllTrash(sessionUser.id));
		}
	}, [sessionUser, dispatch]);

	if (!sessionUser) return <Redirect to="/login" />;

	return (
		<div className="desktop-container">
			<Navigation sessionUser={sessionUser} />
			<Switch>
				<Route path="/desktop">
					<Desktop />
				</Route>
				<Route path="/notes">
					<NotesPage />
				</Route>
				<Route path="/notebooks">
					<NotebooksPage />
				</Route>
				<Route path="/tags">
					<TagsPage />
				</Route>
				<Route path="/trash">
					<TrashPage />
				</Route>
			</Switch>
		</div>
	);
};

export default DesktopPage;
