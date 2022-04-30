import React, { useState, useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import * as notebooksActions from "../../store/notebooks";
import * as notesActions from "../../store/notes";
import * as tagsActions from "../../store/tags";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation";
import "./Desktop.css";

const DesktopPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
  const {notebooks} = useSelector((state) => state.notebooks);
  const {notes} = useSelector((state) => state.notes);
  const {tags} = useSelector((state) => state.tags);


  // useEffect to get all notebooks
  useEffect(() => {
    if (sessionUser){
      dispatch(notebooksActions.getAllNotebooks(sessionUser.id));
      dispatch(notesActions.getAllNotes(sessionUser.id));
          dispatch(tagsActions.getAllTags(sessionUser.id));
    }
  },[sessionUser, dispatch])

	if (!sessionUser) return <Redirect to="/login" />;

	const logout = (e) => {
		return dispatch(sessionActions.logoutUser());
	};

    // Test button
  const test = (e) => {
    e.preventDefault();
  }

	return (
		<div className="desktop-container">
			<Navigation
        sessionUser={sessionUser}
        notebooks={notebooks}
        notes={notes}
        tags={tags}
        />
			<main>
        <button onClick={test}>Test</button>
      </main>
		</div>
	);
};

export default DesktopPage;
