import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { useDisableEdit } from "../../context/DisableEditContext";
import { useNotification } from "../../context/NotificationContext";

const Notes = () => {
	const history = useHistory();

	const { setDisableEdit } = useDisableEdit();
	const { setToggleNotification, setNotificationMsg } = useNotification();

	const notes = useSelector((state) => state.notes);

	const [showNotes, setShowNotes] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);

	const notesDDDiv = useRef();
	const notesCaret = useRef();

	const tooltip = useRef();

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
		if (showTooltip) {
			tooltip.current.classList.remove("hidden");
		} else {
			tooltip.current.classList.add("hidden");
		}
	}, [showTooltip]);

	return (
		<>
			<div className="nav-div" onClick={() => history.push("/notes")}>
				<div className="nav-div-left">
					<div
						className="nav-caret"
						ref={notesCaret}
						onClick={(e) => {
							e.stopPropagation();
							setShowNotes(!showNotes);
						}}
					>
						<i className="fa-solid fa-caret-right"></i>
					</div>
					<i className="fa-solid fa-file-lines"></i>
					<div>Notes</div>
				</div>
				<div
					className="nav-div-right tooltip"
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
				>
					<i
						className="fa-solid fa-circle-plus nav-add"
						onClick={(e) => {
							e.stopPropagation();
							setDisableEdit(false);
							setNotificationMsg("Start adding something!");
							setToggleNotification("");

							setTimeout(() => {
								setToggleNotification("notification-move");
							}, 2000);
							history.push("/notes/new");
						}}
					></i>
					<span className="navTooltiptext hidden" ref={tooltip}>
						New Note
					</span>
				</div>
			</div>
			{/* notes dropdown */}
			<div className="nav-dd nav-dropdown-hide" ref={notesDDDiv}>
				{Object.values(notes)[0] &&
					Object.values(notes).map((note) => (
						<Link to={`/notes/${note?.id}`}>
							<div className="nav-dd-div" key={note?.id}>
								<i className="fa-regular fa-file-lines"></i>
								<div className="nav-dd-title">{note?.title}</div>
							</div>
						</Link>
					))}

				<div
					className="nav-dd-div nav-new"
					onClick={() => {
						setDisableEdit(false);
						setNotificationMsg("Start adding something!");
						setToggleNotification("");

						setTimeout(() => {
							setToggleNotification("notification-move");
						}, 2000);
						history.push("/notes/new");
					}}
				>
					<i className="fa-regular fa-plus"></i>
					<i className="fa-regular fa-file-lines"></i>
					<div className="nav-dd-title">New Note</div>
				</div>
			</div>
		</>
	);
};

export default Notes;
