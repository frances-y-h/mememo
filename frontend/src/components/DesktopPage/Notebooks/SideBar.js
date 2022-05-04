import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NoteCard from "./NoteCard";
// import NewNotebookModal from "../Tools/NewNotebookModal";

import * as notebooksActions from "../../../store/notebooks";

const SideBar = () => {
	const { notebookId, noteId } = useParams();
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [disable, setDisable] = useState(true);
	const [errors, setErrors] = useState([]);

	const inputErr = useRef();
	const editModal = useRef();

	const notebooks = useSelector((state) => state.notebooks);
	const notebook = useSelector((state) => state.notebooks[notebookId]);
	const notes = Object.values(useSelector((state) => state.notes))?.filter(
		(note) =>
			note?.notebookId === parseInt(notebookId, 10) && note?.trash === false
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const notebook = { id: notebookId, name };

		await dispatch(notebooksActions.editNotebook(notebook));
		editModal?.current?.classList.add("hidden");
	};

	const cancel = (e) => {
		e.preventDefault();
		e.stopPropagation();
		editModal?.current?.classList.add("hidden");
	};

	const showModal = () => {
		editModal?.current?.classList.remove("hidden");
	};

	useEffect(() => {
		setName(notebook?.name);
	}, [notebookId]);

	useEffect(() => {
		const nameExists = Object.values(notebooks).some(
			(notebook) =>
				notebook?.name === name && notebook?.id !== parseInt(notebookId, 10)
		);

		if (name?.length <= 0 || name?.length > 255) {
			setErrors("Must be between 1 and 255 characters");
			inputErr.current.classList.remove("hidden");
			setDisable(true);
		} else if (nameExists) {
			setErrors("Name already exists");
			inputErr.current.classList.remove("hidden");
			setDisable(true);
		} else {
			inputErr.current.classList.add("hidden");
			setErrors("");
			setDisable(false);
		}
	}, [name]);

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
						<div className="note-title-empty" onClick={showModal}>
							Rename
						</div>
					</div>
				</div>
				<div className="note-card-wrap">
					<NoteCard notebookId={notebookId} noteId={noteId} />
				</div>
			</div>
			{/* Edit modal */}
			<div className="modalBgTag" ref={editModal} onClick={cancel}>
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
			</div>
		</>
	);
};

export default SideBar;
