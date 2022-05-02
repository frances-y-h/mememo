import { useParams, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

import * as notesActions from "../../../store/notes";

const NotePage = () => {
	const { tagId, noteId } = useParams();
	const dispatch = useDispatch();
	const note = useSelector((state) => state.notes[noteId]);
	// const userId = useSelector((state) => state.session.user.id);
	const notebooks = Object.values(useSelector((state) => state.notebooks));

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [disableEdit, setDisableEdit] = useState(true);

	const moveDD = useRef();
	const modalBg = useRef();
	const saveBtn = useRef();
	const addTag = useRef();
	const notification = useRef();

	const saveTooltip = useRef();
	const editTooltip = useRef();
	const deleteTooltip = useRef();

	const openDD = () => {
		moveDD?.current.classList.remove("hidden");
		modalBg?.current.classList.remove("hidden");
	};

	const editNote = () => {
		setDisableEdit(false);
		saveBtn?.current.classList.remove("hidden");
		addTag?.current.classList.remove("hidden");
	};

	const saveNote = () => {
		const notebookId = note.notebookId;
		const noteToUpdate = { title, content, notebookId };

		// get tags as an array
		dispatch(notesActions.editNote(noteId, noteToUpdate));

		setDisableEdit(true);
		saveBtn?.current.classList.add("hidden");
		addTag?.current.classList.add("hidden");
		notification?.current.classList.remove("notification-move");

		setTimeout(() => {
			notification?.current.classList.add("notification-move");
		}, 2000);
	};

	useEffect(() => {
		setTitle(note.title);
		setContent(note.content);
	}, [note?.title, note?.content]);

	return (
		<>
			<div
				className="modalBg5 hidden"
				ref={modalBg}
				onClick={() => {
					moveDD?.current.classList.add("hidden");
					modalBg?.current.classList.add("hidden");
				}}
			></div>
			<div className="note-view-notebook-wrap">
				<div className="pad5">
					<Link
						to={`/notebook/${note?.Notebook?.id}`}
						className="note-view-notebook"
					>
						<i className="fa-solid fa-book"></i>
						{note?.Notebook?.name}
					</Link>
					<div className="notebook-move-dd-wrap">
						<div className="note-view-notebook-move" onClick={openDD}>
							<i className="fa-solid fa-arrow-right-to-bracket"> </i>
							other notebook
						</div>
						<div className="notebook-move-dd hidden" ref={moveDD}>
							<div className="notebook-move-dd-div">Move to...</div>
							{notebooks.map((notebook) => (
								<div key={notebook?.id} className="notebook-move-dd-div">
									{notebook?.name}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="note-view-notebook-edit">
					<div className="tooltip">
						<i
							className="fa-solid fa-floppy-disk hidden"
							ref={saveBtn}
							onClick={saveNote}
							onMouseEnter={() =>
								saveTooltip?.current.classList.toggle("hidden")
							}
							onMouseLeave={() =>
								saveTooltip?.current.classList.toggle("hidden")
							}
						></i>
						<span className="icon-tooltiptext hidden" ref={saveTooltip}>
							Save
						</span>
					</div>
					<div
						className="tooltip"
						onMouseEnter={() => editTooltip.current.classList.toggle("hidden")}
						onMouseLeave={() => editTooltip.current.classList.toggle("hidden")}
					>
						<i className="fa-solid fa-pen-to-square" onClick={editNote}></i>
						<span className="icon-tooltiptext hidden" ref={editTooltip}>
							Edit
						</span>
					</div>
					<div
						className="tooltip"
						onMouseEnter={() =>
							deleteTooltip?.current.classList.toggle("hidden")
						}
						onMouseLeave={() =>
							deleteTooltip?.current.classList.toggle("hidden")
						}
					>
						<i className="fa-solid fa-trash-can"></i>
						<span className="icon-tooltiptext hidden" ref={deleteTooltip}>
							Delete
						</span>
					</div>
				</div>
			</div>
			<div className="note-view-update">
				Last edited on{" "}
				{note && formatDistanceToNow(parseISO(note?.updatedAt), "MMM d, y")} ago
			</div>
			<div onClick={editNote}>
				<input
					type="text"
					value={title}
					className="note-view-title"
					disabled={disableEdit}
					placeholder="Title"
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div onClick={editNote}>
				<textarea
					value={content}
					className="note-view-content"
					disabled={disableEdit}
					placeholder="Say something..."
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>
			<div className="note-view-tags">
				{note?.Tags.map((tag) => (
					<div
						key={tag?.id}
						className="tag"
						style={{ backgroundColor: `#${tag?.color}` }}
					>
						{tag?.name}
					</div>
				))}
				<i className="fa-solid fa-circle-plus hidden" ref={addTag}></i>
			</div>
			<div className="notification-div notification-move" ref={notification}>
				<i className="fa-solid fa-floppy-disk"></i>Note Saved
			</div>
		</>
	);
};

export default NotePage;
