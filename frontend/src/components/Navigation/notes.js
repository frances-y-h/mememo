import React, { useState, useEffect, useRef } from "react";

const Notes = ({ notes }) => {
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
			<div className="nav-div" onClick={() => setShowNotes(!showNotes)}>
				<div className="nav-div-left">
					<div className="nav-caret" ref={notesCaret}>
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
					<i className="fa-solid fa-circle-plus nav-add"></i>
					<span className="navTooltiptext hidden" ref={tooltip}>
						New Note
					</span>
				</div>
			</div>
			{/* notes dropdown */}
			<div className="nav-dd nav-dropdown-hide" ref={notesDDDiv}>
				{notes &&
					notes.map((note) => (
						<div className="nav-dd-div" key={note.id}>
							<i className="fa-regular fa-file-lines"></i>
							<div className="nav-dd-title">{note.title}</div>
						</div>
					))}
				<div className="nav-dd-div nav-new">
					<i className="fa-regular fa-plus"></i>
					<i className="fa-regular fa-file-lines"></i>
					<div className="nav-dd-title">New Note</div>
				</div>
			</div>
		</>
	);
};

export default Notes;
