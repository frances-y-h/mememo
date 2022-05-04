import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNewNotebookModal } from "../../../context/NewNotebookModalContext";
import { useNotification } from "../../../context/NotificationContext";

import * as notebooksActions from "../../../store/notebooks";

const NewNotebookModal = () => {
	const [name, setName] = useState("");
	const [disable, setDisable] = useState(true);
	const [errors, setErrors] = useState([]);

	const dispatch = useDispatch();
	const history = useHistory();

	const notebooks = useSelector((state) => state.notebooks);

	const { setToggleNotification, setNotificationMsg } = useNotification();

	const inputErr = useRef();

	const { toggleNewNotebookModal, setToggleNewNotebookModal } =
		useNewNotebookModal();

	const cancel = (e) => {
		e.stopPropagation();
		setToggleNewNotebookModal("hidden");
		setName("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const notebook = { name };

		// dispatch name , create in database, get back notebook id
		const newNotebook = await dispatch(notebooksActions.addNotebook(notebook));

		// close modal
		setToggleNewNotebookModal("hidden");

		// show notification notebook created
		setNotificationMsg(`Notebook "${newNotebook.name}" created`);
		setToggleNotification("");

		// Reset name
		setName("");

		// redirect to new notebook
		history.push(`/notebooks/${newNotebook.id}`);

		setTimeout(() => {
			setToggleNotification("notification-move");
		}, 4000);
	};

	useEffect(() => {
		const nameExists = Object.values(notebooks).some(
			(notebook) => notebook?.name === name
		);

		if (name.length <= 0 || name.length > 255) {
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
		<div className={`modalBgTag ${toggleNewNotebookModal}`} onClick={cancel}>
			<form className="form-control" onClick={(e) => e.stopPropagation()}>
				<div className="modal-title">Create new notebook</div>
				<div className="modal-content">
					Notebooks are useful for grouping notes around a common topic. They
					can be private or shared.
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
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewNotebookModal;
