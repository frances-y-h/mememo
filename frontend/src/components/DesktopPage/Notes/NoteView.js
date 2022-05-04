import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useModal } from "../../../context/ModalContext";
import { useNotification } from "../../../context/NotificationContext";
import { useDisableEdit } from "../../../context/DisableEditContext";

import * as notesActions from "../../../store/notes";
import * as trashActions from "../../../store/trash";

const NoteView = () => {
	// check if there is note id from use params, if not, redirect to most recent note
	const { noteId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const notes = useSelector((state) => state.notes);
	const notesOrdered = Object.values(notes).sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);
	let note = useSelector((state) => state.notes[noteId]);
	const notebooks = useSelector((state) => state.notebooks);
	const tags = useSelector((state) => state.tags);

	const { setToggleNotification, setNotificationMsg } = useNotification();
	const { setToggleTagModal } = useModal();
	const { disableEdit, setDisableEdit } = useDisableEdit();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tagsArr, setTagsArr] = useState([]);
	const [tagDDList, setTagDDList] = useState([]);

	const moveDD = useRef(null);
	const modalBg = useRef(null);
	const saveBtn = useRef(null);
	const addTag = useRef(null);
	const removeTagIcon = useRef([]);
	const tagDD = useRef(null);

	const saveTooltip = useRef(null);
	const editTooltip = useRef(null);
	const deleteTooltip = useRef(null);

	// if there is param, but param is "new", which will return "undefined for note"
	if (!note) {
		note = {
			title: "",
			content: "",
			notebookId: Object.keys(notebooks)[0],
			trash: false,
			Tags: [],
		};
	}

	const openDD = () => {
		moveDD.current.classList.remove("hidden");
		modalBg.current.classList.remove("hidden");
	};

	const editNote = () => {
		if (disableEdit) {
			setDisableEdit(false);

			setNotificationMsg("Start adding something!");
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
			}, 2000);
			return;
		}
	};

	const saveNote = async () => {
		const notebookId = note.notebookId;
		const noteToUpdate = { title, content, notebookId, trash: false, tagsArr };

		if (title === "") {
			setNotificationMsg(
				"Title needs to be at least 1 character. Note not saved."
			);
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
			}, 4000);
			return;
		}

		if (noteId === "new") {
			const newNoteId = await dispatch(notesActions.addNewNote(noteToUpdate));

			setDisableEdit(true);
			setNotificationMsg("Note created");
			saveBtn?.current.classList.add("hidden");
			addTag?.current.classList.add("hidden");
			removeTagIcon.current.forEach((span) => {
				span?.classList.add("hidden");
			});
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
			}, 2000);

			history.push(`/notes/${newNoteId}`);
		} else {
			await dispatch(notesActions.editNote(noteId, noteToUpdate));

			setDisableEdit(true);
			setNotificationMsg("Note saved");
			saveBtn?.current.classList.add("hidden");
			addTag?.current.classList.add("hidden");
			removeTagIcon.current.forEach((span) => {
				span?.classList.add("hidden");
			});
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
			}, 2000);
		}
	};

	const removeTag = (tagId) => {
		const newTagArr = tagsArr.filter((tag) => tag.id !== parseInt(tagId, 10));
		setTagsArr(newTagArr);
	};

	const moveToNotebook = async (notebookId) => {
		if (noteId !== "new") {
			const note = {
				title,
				content,
				notebookId,
				trash: false,
				tagsArr,
			};

			await dispatch(notesActions.editNote(noteId, note));
			setNotificationMsg("Moved to Notebook");
			moveDD.current.classList.add("hidden");
			modalBg.current.classList.add("hidden");
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
			}, 2000);
		} else {
			moveDD.current.classList.add("hidden");
			modalBg.current.classList.add("hidden");
			setNotificationMsg("Plase save note first");
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
			}, 2000);
		}
	};

	const moveToTrash = async () => {
		if (noteId !== "new") {
			const note = {
				title,
				trash: true,
			};
			await dispatch(notesActions.trashNote(noteId, note));
			await dispatch(trashActions.getAllTrash());
			setNotificationMsg("Moved to Trash");
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
				setTitle("");
				setContent("");
			}, 2000);
			history.push("/notes");
		} else {
			setNotificationMsg("Plase save note first");
			setToggleNotification("");

			setTimeout(() => {
				setToggleNotification("notification-move");
			}, 2000);
		}
	};

	const moveNotebookDD = () => {
		moveDD.current.classList.add("hidden");
		tagDD.current.classList.add("hidden");
		modalBg.current.classList.add("hidden");
	};

	useEffect(() => {
		setTitle(note?.title);
		setContent(note?.content);
		setTagsArr(note?.Tags);
		saveBtn?.current?.classList.add("hidden");
		addTag?.current?.classList.add("hidden");
		removeTagIcon.current.forEach((span) => {
			span?.classList.add("hidden");
		});
		setDisableEdit(true);
	}, [noteId]);

	useEffect(() => {
		// turn tagsArr (what tags the note currently has) in to set
		const set = new Set(tagsArr?.map((tag) => tag.id));
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

	useEffect(() => {
		if (!disableEdit) {
			saveBtn?.current?.classList.remove("hidden");
			addTag?.current?.classList.remove("hidden");

			removeTagIcon.current.forEach((span) => {
				span?.classList.remove("hidden");
			});
		}
	}, [disableEdit]);

	if (notes && !noteId) {
		return <Redirect to={`/notes/${notesOrdered[0]?.id}`} />;
	}

	if (notes) {
		return (
			<>
				{/* modal background */}
				<div
					className="modalBg1 hidden"
					ref={modalBg}
					onClick={moveNotebookDD}
				></div>
				<div className="note-view">
					<div className="note-view-notebook-wrap">
						<div className="pad5">
							<Link
								to={`/notebooks/${note.notebookId}`}
								className="note-view-notebook"
							>
								<i className="fa-solid fa-book"></i>
								{notebooks[note.notebookId]?.name}
							</Link>
							<div className="notebook-move-dd-wrap">
								<div className="note-view-notebook-move" onClick={openDD}>
									<i className="fa-solid fa-arrow-right-to-bracket"> </i>
									Move to another notebook
								</div>
								<div className="notebook-move-dd hidden" ref={moveDD}>
									<div className="notebook-move-dd-div">Move to...</div>
									{Object.values(notebooks).map((notebook) => (
										<div
											key={notebook?.id}
											className="notebook-move-dd-div"
											onClick={() => {
												moveToNotebook(notebook?.id);
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
								onMouseEnter={() =>
									editTooltip.current.classList.toggle("hidden")
								}
								onMouseLeave={() =>
									editTooltip.current.classList.toggle("hidden")
								}
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
						{/* {formatDistanceToNow(parseISO(note?.updatedAt))} ago */}
					</div>
					<div onClick={editNote}>
						<input
							type="text"
							value={title}
							className="note-view-title"
							disabled={disableEdit}
							placeholder="New Title"
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
					<div className="note-view-tags" onClick={editNote}>
						{tagsArr?.map((tag, idx) => (
							<div key={tag.id} className="note-view-tag">
								<div
									className="tag"
									style={{ backgroundColor: `#${tag?.color}` }}
								>
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
									tagDD?.current.classList.remove("hidden");
									modalBg?.current.classList.remove("hidden");
								}}
							></i>
							<div className="note-tag-dd hidden" ref={tagDD}>
								<div
									className="tag cursor"
									onClick={() => setToggleTagModal("")}
								>
									<i className="fa-solid fa-circle-plus"></i> New Tag
								</div>
								{tagDDList?.map((tag) => (
									<div
										key={tag?.id}
										className="tag cursor"
										style={{ backgroundColor: `#${tag?.color}` }}
										onClick={() => setTagsArr([...tagsArr, tag])} // when clicked will add to tagsArr
									>
										{tag?.name}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<div className="notebook-bg">
				<div className="notebook-container">
					<img src="/images/logo.svg" alt="bee" className="fly-bee" />
					<div className="notebook-ctnr-title">No notes in this notebook</div>
				</div>
			</div>
		);
	}
};

export default NoteView;
