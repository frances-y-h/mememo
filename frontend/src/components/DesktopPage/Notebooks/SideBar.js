import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NoteCard from "./NoteCard";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

import { useModal } from "../../../context/ModalContext";

const SideBar = () => {
	const { notebookId, noteId } = useParams();
	// const dispatch = useDispatch();

	// const [name, setName] = useState("");
	// const [disable, setDisable] = useState(true);
	// const [errors, setErrors] = useState([]);
	const [deleteMsg, setDeleteMsg] = useState("");
	const { setToggleEditNotebookModal, setToggleDeleteNotebookModal } =
		useModal();

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
		// setName(notebook?.name);

		if (Object.keys(notebooks)[0] === notebookId) {
			setDeleteMsg("Cannot delete primary notebook");
		} else {
			setDeleteMsg("Delete");
		}
	}, [notebookId]);

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
									onClick={() => setToggleDeleteNotebookModal("")}
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
			<DeleteModal notebook={notebook} />
		</>
	);
};

export default SideBar;
