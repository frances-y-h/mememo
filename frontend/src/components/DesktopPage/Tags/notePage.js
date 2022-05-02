import { useParams, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useTagModal } from "../../../context/TagModalContext";

import * as notesActions from "../../../store/notes";
import * as trashActions from "../../../store/trash";

const NotePage = () => {
	const { setToggleModal } = useTagModal();
	const { noteId } = useParams();
	const dispatch = useDispatch();
	const note = useSelector((state) => state.notes[noteId]);
	const userId = useSelector((state) => state.session.user.id);
	const notebooks = Object.values(useSelector((state) => state.notebooks));
	const tags = useSelector((state) => state.tags);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [disableEdit, setDisableEdit] = useState(true);
	const [notifications, setNotifications] = useState("");
	const [tagsArr, setTagsArr] = useState([]);
	const [tagDDList, setTagDDList] = useState([]);

	const moveDD = useRef(null);
	const modalBg = useRef(null);
	const saveBtn = useRef(null);
	const addTag = useRef(null);
	const notification = useRef(null);
	const removeTagIcon = useRef([]);
	const tagDD = useRef(null);

	const saveTooltip = useRef(null);
	const editTooltip = useRef(null);
	const deleteTooltip = useRef(null);

	const openDD = () => {
		moveDD?.current.classList.remove("hidden");
		modalBg?.current.classList.remove("hidden");
	};

	const editNote = () => {
		setDisableEdit(false);
		saveBtn?.current.classList.remove("hidden");
		addTag?.current.classList.remove("hidden");

		removeTagIcon.current.forEach((span) => {
			span?.classList.remove("hidden");
		});
	};

	const saveNote = async () => {
		const notebookId = note.notebookId;
		const noteToUpdate = { title, content, notebookId, trash: false, tagsArr };
		// get tags as an array
		await dispatch(notesActions.editNote(noteId, noteToUpdate));

		setDisableEdit(true);
		setNotifications("Note Saved");
		saveBtn?.current.classList.add("hidden");
		addTag?.current.classList.add("hidden");
		removeTagIcon.current.forEach((span) => {
			span?.classList.add("hidden");
		});
		notification?.current.classList.remove("notification-move");

		setTimeout(() => {
			notification?.current.classList.add("notification-move");
		}, 2000);
	};

	const removeTag = (tagId) => {
		const newTagArr = tagsArr.filter((tag) => tag.id !== parseInt(tagId, 10));
		setTagsArr(newTagArr);
	};

	const moveToNotebook = async (notebookId) => {
		const note = { notebookId, trash: false };
		await dispatch(notesActions.editNote(noteId, note));
		setNotifications("Moved to Notebook");
		moveDD?.current.classList.add("hidden");
		modalBg?.current.classList.add("hidden");
		notification?.current.classList.remove("notification-move");

		setTimeout(() => {
			notification?.current.classList.add("notification-move");
		}, 2000);
	};

	const moveToTrash = async () => {
		const note = { trash: true };
		await dispatch(notesActions.trashNote(noteId, note));
		await dispatch(trashActions.getAllTrash(userId));
		setNotifications("Moved to Trash");
		notification?.current.classList.remove("notification-move");

		setTimeout(() => {
			notification?.current.classList.add("notification-move");
		}, 2000);
		setTitle("");
		setContent("");
	};

	useEffect(() => {
		setTitle(note?.title);
		setContent(note?.content);
		setTagsArr(note?.Tags);
	}, [note]);

	useEffect(() => {
		// get turn tagsArr (what tags the note currently has) in to set
		const set = new Set(tagsArr.map((tag) => tag.id));
		const arr = [];
		// tags = array of all tags from useSelector
		Object.values(tags).forEach((tag) => {
			// update what ever that is not in the tagArry to tagDDList
			if (!set.has(tag?.id)) {
				arr.push(tag);
			}
		});
		setTagDDList(arr);
	}, [tagsArr, tags]);

	return (
		<>
			<div
				className="modalBg1 hidden"
				ref={modalBg}
				onClick={() => {
					moveDD?.current.classList.add("hidden");
					tagDD?.current.classList.add("hidden");
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
								<div
									key={notebook?.id}
									className="notebook-move-dd-div"
									onClick={() => {
										moveToNotebook(notebook.id);
									}}
								>
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
						<i className="fa-solid fa-trash-can" onClick={moveToTrash}></i>
						<span className="icon-tooltiptext hidden" ref={deleteTooltip}>
							Trash
						</span>
					</div>
				</div>
			</div>
			<div className="note-view-update">
				Last edited{" "}
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
			{/* Tags section */}
			{/* show mini remove icon when in edit mode */}
			<div className="note-view-tags">
				{tagsArr?.map((tag, idx) => (
					<div key={tag.id} className="note-view-tag">
						<div className="tag" style={{ backgroundColor: `#${tag?.color}` }}>
							{tag?.name}
						</div>
						<span
							className="note-tags-remove hidden"
							onClick={() => removeTag(tag.id)}
							ref={(el) => {
								removeTagIcon.current[idx] = el;
							}}
						>
							<i className="fa-solid fa-circle-minus"></i>
						</span>
					</div>
				))}
				<div className="note-tag-dd-wrap">
					<i
						className="fa-solid fa-circle-plus hidden"
						ref={addTag}
						onClick={() => {
							tagDD.current.classList.remove("hidden");
							modalBg?.current.classList.remove("hidden");
						}}
					></i>
					<div className="note-tag-dd hidden" ref={tagDD}>
						<div className="tag cursor" onClick={() => setToggleModal("")}>
							<i className="fa-solid fa-circle-plus"></i> New Tag
						</div>
						{tagDDList?.map((tag) => (
							<div
								key={tag.id}
								className="tag cursor"
								style={{ backgroundColor: `#${tag.color}` }}
								onClick={() => setTagsArr([...tagsArr, tag])} // when clicked will add to tagsArr
							>
								{tag.name}
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Notification box */}
			<div className="notification-div notification-move" ref={notification}>
				<i className="fa-solid fa-floppy-disk"></i>
				{notifications}
			</div>
		</>
	);
};

export default NotePage;
