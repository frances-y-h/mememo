import React, { useState, useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ sessionUser }) => {
	const { username, avatarUrl } = sessionUser;

	console.log(avatarUrl);
	const dispatch = useDispatch();

	const [showUserDD, setShowUserDD] = useState(false);
	const [showNotes, setShowNotes] = useState(false);
	const [showNotebooks, setShowNotebooks] = useState(false);

	const userDD = useRef();
	const notesDDDiv = useRef();
	const notesCaret = useRef();
	const modal = useRef();

	const notebooksDDDiv = useRef();
	const notebooksCaret = useRef();

	const logout = (e) => {
		return dispatch(sessionActions.logoutUser());
	};

	const closeModal = () => {
		userDD.current.classList.add("nav-dropdown-hide");
		modal.current.classList.add("nav-dropdown-hide");
	};

	useEffect(() => {
		if (showUserDD) {
			userDD.current.classList.remove("nav-dropdown-hide");
			modal.current.classList.remove("nav-dropdown-hide");
		} else {
			userDD.current.classList.add("nav-dropdown-hide");
			modal.current.classList.add("nav-dropdown-hide");
		}
	}, [showUserDD]);

	useEffect(() => {
		if (showNotes) {
			notesDDDiv.current.classList.remove("nav-dropdown-hide");
			notesCaret.current.classList.add("nav-caret-down");
		} else {
			notesDDDiv.current.classList.add("nav-dropdown-hide");
			notesCaret.current.classList.remove("nav-caret-down");
		}
	}, [showNotes]);

	useEffect(() => {
		if (showNotebooks) {
			notebooksDDDiv.current.classList.remove("nav-dropdown-hide");
			notebooksCaret.current.classList.add("nav-caret-down");
		} else {
			notebooksDDDiv.current.classList.add("nav-dropdown-hide");
			notebooksCaret.current.classList.remove("nav-caret-down");
		}
	}, [showNotebooks]);

	return (
		<nav className="navbar">
			<div
				className="modal nav-dropdown-hide"
				ref={modal}
				onClick={closeModal}
			></div>
			<div className="nav-top" onClick={() => setShowUserDD(!showUserDD)}>
				<img src={avatarUrl} alt={username} className="nav-avatar-img" />
				<div>{username}</div>
			</div>
			<div className="nav-user-dd" ref={userDD}>
				<div className="nav-user-dd-div" onClick={logout}>
					Logout as {username}{" "}
				</div>
			</div>
			{/* notes */}
			<div className="nav-div">
				<div className="nav-div-left">
					<div className="nav-caret"></div>
					<i className="fa-solid fa-house-chimney"></i>
					<div>Home</div>
				</div>
			</div>
			{/* notes */}
			<div className="nav-div" onClick={() => setShowNotes(!showNotes)}>
				<div className="nav-div-left">
					<div className="nav-caret" ref={notesCaret}>
						<i className="fa-solid fa-caret-right"></i>
					</div>
					<i className="fa-solid fa-file-lines"></i>
					<div>Notes</div>
				</div>
				<div className="nav-div-right tooltip">
					<i className="fa-solid fa-circle-plus nav-add"></i>
					{/* <span className="tooltiptext">New Note</span> */}
				</div>
			</div>
			{/* notes dropdown */}
			<div className="nav-dd nav-dropdown-hide" ref={notesDDDiv}>
				<div className="nav-dd-div">
					<i className="fa-regular fa-file-lines"></i>
					<div className="nav-dd-title">Notes number 1</div>
				</div>
				<div className="nav-dd-div">
					<i className="fa-regular fa-file-lines"></i>
					<div className="nav-dd-title">Notes number 2</div>
				</div>
				<div className="nav-dd-div">
					<i className="fa-regular fa-file-lines"></i>
					<div className="nav-dd-title">Notes number 3</div>
				</div>
				<div className="nav-dd-div nav-new">
					<i className="fa-regular fa-plus"></i>
					<i className="fa-regular fa-file-lines"></i>
					<div className="nav-dd-title">New Note</div>
				</div>
			</div>
			{/* notebook */}
			<div className="nav-div" onClick={() => setShowNotebooks(!showNotebooks)}>
				<div className="nav-div-left">
					<div className="nav-caret" ref={notebooksCaret}>
						<i className="fa-solid fa-caret-right"></i>
					</div>
					<i className="fa-solid fa-book"></i>
					<div>Notebooks</div>
				</div>
				<div className="nav-div-right">
					<i className="fa-solid fa-circle-plus nav-add"></i>
				</div>
			</div>
			{/* Notebook dropdown */}
			<div className="nav-dd nav-dropdown-hide" ref={notebooksDDDiv}>
				<div className="nav-dd-div">
					<i className="fa-solid fa-book"></i>
					<div className="nav-dd-title">Notebook 1</div>
				</div>
				<div className="nav-dd-div">
					<i className="fa-solid fa-book"></i>
					<div className="nav-dd-title">Notebook 2</div>
				</div>
				<div className="nav-dd-div">
					<i className="fa-solid fa-book"></i>
					<div className="nav-dd-title">Notebook 3</div>
				</div>
				<div className="nav-dd-div nav-new">
					<i className="fa-regular fa-plus"></i>
					<i className="fa-solid fa-book"></i>
					<div className="nav-dd-title">New Notebook</div>
				</div>
			</div>
			{/* Tags */}
			<div className="nav-div">
				<div className="nav-div-left">
					<div className="nav-caret">
						<i className="fa-solid fa-caret-right"></i>
					</div>
					<i className="fa-solid fa-tags"></i>
					<div>Tags</div>
				</div>
				<div className="nav-div-right">
					<i className="fa-solid fa-circle-plus nav-add"></i>
				</div>
			</div>
			{/* Trash Can */}
			<div className="nav-div">
				<div className="nav-div-left">
					<div className="nav-caret"></div>
					<i className="fa-solid fa-trash-can"></i>
					<div>Trash</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
