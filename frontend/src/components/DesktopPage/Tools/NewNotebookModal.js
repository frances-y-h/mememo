import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNewNotebookModal } from "../../../context/NewNotebookModalContext";

const NewNotebookModal = () => {
	const [name, setName] = useState("");
	const [disable, setDisable] = useState(true);
	const [errors, setErrors] = useState([]);

	const notebooks = useSelector((state) => state.notebooks);

	const inputErr = useRef();

	const { toggleNewNotebookModal, setToggleNewNotebookModal } =
		useNewNotebookModal();

	const cancel = (e) => {
		e.stopPropagation();
		setToggleNewNotebookModal("hidden");
		setName("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		const nameExists = Object.values(notebooks).some(
			(notebook) => notebook.name === name
		);

		if (name.length === 0) {
			setErrors("Must contain at least one character");
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
