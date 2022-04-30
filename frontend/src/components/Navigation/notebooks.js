import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const Notebooks = ({ notebooks }) => {
	const [showNotebooks, setShowNotebooks] = useState(false);

	const notebooksDDDiv = useRef();
	const notebooksCaret = useRef();

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
    <>
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
        {notebooks && notebooks.map((notebook) => (
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
  )
};

export default Notebooks;
