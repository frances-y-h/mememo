import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/ModalContext";

import * as notebooksActions from "../../../store/notebooks";

const EditModal = ({ notebook }) => {
	const dispatch = useDispatch();
	const notebooks = useSelector((state) => state.notebooks);

	const [name, setName] = useState("");
	const [disable, setDisable] = useState(true);
	const [errors, setErrors] = useState([]);
	const notebookId = notebook?.id;

	const { toggleEditNotebookModal, setToggleEditNotebookModal } = useModal();

	const inputErr = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const notebook = { id: notebookId, name };

		await dispatch(notebooksActions.editNotebook(notebook));
		setToggleEditNotebookModal("hidden");
	};

	const cancel = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setToggleEditNotebookModal("hidden");
	};

	useEffect(() => {
		setName(notebook?.name);
	}, [notebook?.id]);

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
		<div className={`modalBgTag ${toggleEditNotebookModal}`} onClick={cancel}>
			<form
				className="form-control"
				onClick={(e) => e.stopPropagation()}
				onSubmit={handleSubmit}
			>
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
						disabled={disable}
					>
						Rename
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditModal;
