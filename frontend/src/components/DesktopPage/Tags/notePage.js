import { useParams, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, format, parseISO } from "date-fns";

const NotePage = () => {
	const { tagId, noteId } = useParams();
	// const dispatch = useDispatch();
	const note = useSelector((state) => state.notes[noteId]);
	// const userId = useSelector((state) => state.session.user.id);
	const notebooks = Object.values(useSelector((state) => state.notebooks));

	const [title, setTitle] = useState(note?.title);
	const [content, setContent] = useState(note?.content);
	const [disableEdit, setDisableEdit] = useState(true);

	const moveDD = useRef();
	const modalBg = useRef();
	const saveBtn = useRef();
	const addTag = useRef();

	const openDD = () => {
		moveDD.current.classList.remove("hidden");
		modalBg.current.classList.remove("hidden");
	};

	const editNote = () => {
		setDisableEdit(false);
		saveBtn.current.classList.remove("hidden");
		addTag.current.classList.remove("hidden");
	};

	const saveNote = () => {
		// dispatch and save

		setDisableEdit(true);
		saveBtn.current.classList.add("hidden");
		addTag.current.classList.add("hidden");
	};

	return (
		<>
			<div
				className="modalBg5 hidden"
				ref={modalBg}
				onClick={() => {
					moveDD.current.classList.add("hidden");
					modalBg.current.classList.add("hidden");
				}}
			></div>
			<div className="note-view-notebook-wrap">
				<div className="pad5">
					<Link
						to={`/notebook/${note?.Notebook.id}`}
						className="note-view-notebook"
					>
						<i className="fa-solid fa-book"></i>
						{note?.Notebook.name}
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
					<i
						className="fa-solid fa-floppy-disk hidden"
						ref={saveBtn}
						onClick={saveNote}
					></i>
					<i className="fa-solid fa-pen-to-square" onClick={editNote}></i>
					<i className="fa-solid fa-trash-can"></i>
				</div>
			</div>
			<div className="note-view-update">
				Last edited on {note && format(parseISO(note?.updatedAt), "MMM d, y")}
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
		</>
	);
};

export default NotePage;
