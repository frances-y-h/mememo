import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/ModalContext";

import * as notebooksActions from "../../../store/notebooks";
import * as notesActions from "../../../store/notes";
import * as trashActions from "../../../store/trash";

const DeleteModal = ({ notebook }) => {
	const dispatch = useDispatch();
	const { toggleDeleteNotebookModal, setToggleDeleteNotebookModal } =
		useModal();

	const cancel = () => {
		setToggleDeleteNotebookModal("hidden");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await dispatch(notebooksActions.deleteOneNotebook(notebook?.id));
		// getAllNotes
		await dispatch(notesActions.getAllNotes());
		// getAllTrash
		await dispatch(trashActions.getAllTrash());

		// notification about notebook deleted and notes moved to trash
	};

	return (
		<div className={`modalBgTag ${toggleDeleteNotebookModal}`} onClick={cancel}>
			<form
				className="form-control"
				onClick={(e) => e.stopPropagation()}
				onSubmit={handleSubmit}
			>
				<div className="modal-title">Delete Notebook?</div>
				<div className="modal-content">
					Any notes in the notebook will be moved to Trash. This cannot be
					undone.
					<div className="modal-x" onClick={cancel}>
						X
					</div>
				</div>
				<div className="modal-btn-wrap-border">
					<button className="btn btn-black" onClick={cancel}>
						Cancel
					</button>
					<button className="btn btn-alert-solid" type="submit">
						Delete
					</button>
				</div>
			</form>
		</div>
	);
};

export default DeleteModal;
