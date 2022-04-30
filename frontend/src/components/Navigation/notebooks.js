import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Notebooks = () => {
	const history = useHistory();

	const notebooks = Object.values(useSelector((state) => state.notebooks));

	const [showNotebooks, setShowNotebooks] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);

	const notebooksDDDiv = useRef();
	const notebooksCaret = useRef();

	const tooltip = useRef();

	useEffect(() => {
		if (showNotebooks) {
			notebooksDDDiv.current.classList.remove("nav-dropdown-hide");
			notebooksCaret.current.classList.add("nav-caret-down");
		} else {
			notebooksDDDiv.current.classList.add("nav-dropdown-hide");
			notebooksCaret.current.classList.remove("nav-caret-down");
		}
	}, [showNotebooks]);

	useEffect(() => {
		if (showTooltip) {
			tooltip.current.classList.remove("hidden");
		} else {
			tooltip.current.classList.add("hidden");
		}
	}, [showTooltip]);

	return (
		<>
			{/* notebook */}
			<div className="nav-div" onClick={() => history.push("/notebooks")}>
				<div className="nav-div-left">
					<div
						className="nav-caret"
						ref={notebooksCaret}
						onClick={(e) => {
							e.stopPropagation();
							setShowNotebooks(!showNotebooks);
						}}
					>
						<i className="fa-solid fa-caret-right"></i>
					</div>
					<i className="fa-solid fa-book"></i>
					<div>Notebooks</div>
				</div>
				<div
					className="nav-div-right  tooltip"
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
				>
					<i className="fa-solid fa-circle-plus nav-add"></i>
					<span className="navTooltiptext hidden" ref={tooltip}>
						New Notebook
					</span>
				</div>
			</div>
			{/* Notebook dropdown */}
			<div className="nav-dd nav-dropdown-hide" ref={notebooksDDDiv}>
				{notebooks[0] &&
					notebooks.map((notebook) => (
						<div className="nav-dd-div" key={notebook.id}>
							<i className="fa-solid fa-book"></i>
							<div className="nav-dd-title">{notebook.name}</div>
						</div>
					))}
				<div className="nav-dd-div nav-new">
					<i className="fa-regular fa-plus"></i>
					<i className="fa-solid fa-book"></i>
					<div className="nav-dd-title">New Notebook</div>
				</div>
			</div>
		</>
	);
};

export default Notebooks;
