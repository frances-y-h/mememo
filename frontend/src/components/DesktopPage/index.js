import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import TagModalProvider from "../../context/TagModalContext";

import * as notebooksActions from "../../store/notebooks";
import * as notesActions from "../../store/notes";
import * as tagsActions from "../../store/tags";
import * as trashActions from "../../store/trash";

import Navigation from "../Navigation";
import Desktop from "./Desktop/index.js";
import NotesPage from "./Notes/index.js";
import NotebooksPage from "./Notebooks/index.js";
import TagsPage from "./Tags/index.js";
import TrashPage from "./Trash/index.js";

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
			<TagModalProvider>
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
					<Route path={["/tags", "/tags/:tagId"]}>
						<TagsPage />
					</Route>
					<Route path="/trash">
						<TrashPage />
					</Route>
				</Switch>
			</TagModalProvider>
		</div>
	);
};

export default DesktopPage;
