import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NoteCard from "./NoteCard";
import EditModal from "./EditModal";

import { useModal } from "../../../context/ModalContext";

import * as notebooksActions from "../../../store/notebooks";

const SideBar = () => {
	const { notebookId, noteId } = useParams();
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [disable, setDisable] = useState(true);
	const [errors, setErrors] = useState([]);
	const [deleteMsg, setDeleteMsg] = useState("");
	const { setToggleEditNotebookModal } = useModal();

	const inputErr = useRef();
	const editModal = useRef();
	const editTooltip = useRef();
	const deleteTooltip = useRef();

	const notebooks = useSelector((state) => state.notebooks);
	const notebook = useSelector((state) => state.notebooks[notebookId]);
	const notes = Object.values(useSelector((state) => state.notes))?.filter(
		(note) =>
			note?.notebookId === parseInt(notebookId, 10) && note?.trash === false
	);

	const showModal = () => {
		setToggleEditNotebookModal("");
	};

	useEffect(() => {
		setName(notebook?.name);

		if (Object.keys(notebooks)[0] === notebookId) {
			setDeleteMsg("Cannot delete primary notebook");
		} else {
			setDeleteMsg("Delete");
		}
	}, [notebookId]);

	// useEffect(() => {
	// 	const nameExists = Object.values(notebooks).some(
	// 		(notebook) =>
	// 			notebook?.name === name && notebook?.id !== parseInt(notebookId, 10)
	// 	);

	// 	if (name?.length <= 0 || name?.length > 255) {
	// 		setErrors("Must be between 1 and 255 characters");
	// 		inputErr.current.classList.remove("hidden");
	// 		setDisable(true);
	// 	} else if (nameExists) {
	// 		setErrors("Name already exists");
	// 		inputErr.current.classList.remove("hidden");
	// 		setDisable(true);
	// 	} else {
	// 		inputErr.current.classList.add("hidden");
	// 		setErrors("");
	// 		setDisable(false);
	// 	}
	// }, [name]);

	return (
		<>
			<div className="note-sidebar">
				<div className="note-title-box">
					<div className="note-title-wrap">
						<div className="note-title-icon">
							<i className="fa-solid fa-book"></i>
							<div className="note-title">{notebook?.name}</div>
						</div>
					</div>
					<div className="note-title-ctrl">
						<div className="note-title-ctrl-count">
							Total {notes?.length} notes
						</div>
						<div className="note-title-ctrl">
							<div
								className="note-title-empty tooltip"
								onClick={showModal}
								onMouseEnter={() =>
									editTooltip?.current.classList.remove("hidden")
								}
								onMouseLeave={() =>
									editTooltip?.current.classList.add("hidden")
								}
							>
								<i className="fa-solid fa-pen-to-square"></i>
								<span className="icon-tooltiptext hidden" ref={editTooltip}>
									Rename
								</span>
							</div>
							<div
								className="tooltip"
								onMouseEnter={() =>
									deleteTooltip?.current.classList.remove("hidden")
								}
								onMouseLeave={() =>
									deleteTooltip?.current.classList.add("hidden")
								}
							>
								<button
									className="note-title-empty"
									disabled={Object.keys(notebooks)[0] === notebookId}
									onClick={showModal}
								>
									<i className="fa-solid fa-trash-can"></i>
									<span className="icon-tooltiptext hidden" ref={deleteTooltip}>
										{deleteMsg}
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="note-card-wrap">
					<NoteCard notebookId={notebookId} noteId={noteId} />
				</div>
			</div>
			<EditModal notebook={notebook} />
			{/* Edit modal */}
			{/* <div className="modalBgTag hidden" ref={editModal} onClick={cancel}>
				<form className="form-control" onClick={(e) => e.stopPropagation()}>
					<div className="modal-title">Rename Notebook</div>
					<div className="modal-content">
						What would you like to name this notebook?
						<div className="modal-x" onClick={cancel}>
							X
						</div>
					</div>
					<div className="form-input-ctrl tooltip">
						<i className="fa-solid fa-book"></i>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							placeholder="Notebook Name"
							className="input"
						/>
						<span ref={inputErr} className="tooltiptext">
							{errors}
						</span>
					</div>
					<div className="modal-btn-wrap">
						<button className="btn btn-black" onClick={cancel}>
							Cancel
						</button>
						<button
							className="btn btn-mid1-solid"
							type="submit"
							onClick={handleSubmit}
							disabled={disable}
						>
							Rename
						</button>
					</div>
				</form>
			</div> */}
		</>
	);
};

export default SideBar;
