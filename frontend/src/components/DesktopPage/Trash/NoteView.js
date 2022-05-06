import { useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as notesActions from "../../../store/notes";
import * as trashActions from "../../../store/trash";

import UpdatedAt from "../Tools/UpdatedAt";

const NoteView = () => {
	const { noteId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const note = useSelector((state) => state.trash[noteId]);
	const [notifications, setNotifications] = useState("");
	const notification = useRef(null);

	if (note) {
		const deleteNote = async () => {
			await dispatch(trashActions.deleteOneTrash(noteId));
			history.push("/trash");
		};

		const putBack = async () => {
			const putBack = { title: note.title, trash: false };
			await dispatch(notesActions.trashNote(noteId, putBack));
			dispatch(trashActions.putBackDelete(noteId));
			dispatch(notesActions.putBack(note));
			setNotifications("Put back to notebook");
			notification?.current?.classList?.remove("notification-move");

			setTimeout(() => {
				notification?.current?.classList?.add("notification-move");
			}, 2000);
		};

		return (
			<>
				<div className="note-view">
					<div className="note-view-notebook-wrap">
						<div className="pad5 note-view-notebook">
							<i className="fa-solid fa-book"></i>
							{note?.Notebook?.name}
						</div>
						<div className="btn-wrap-gap20">
							<div className="btn btn-m btn-alert-solid" onClick={deleteNote}>
								Delete this note
							</div>
							<div className="btn btn-m btn-mid1-solid" onClick={putBack}>
								<i className="fa-solid fa-arrow-right-to-bracket"></i>
								Put back to notebook
							</div>
						</div>
					</div>
					<div className="note-view-update">
						Last edited
						<UpdatedAt updatedAt={note?.updatedAt} />
					</div>
					<div className="note-view-title-fav-wrap">
						<div className="note-view-title note-in-trash">{note?.title}</div>
					</div>
					<div
						className="note-view-content note-in-trash"
						dangerouslySetInnerHTML={{
							__html: note?.content,
						}}
					></div>
					<div className="note-view-tags">
						{note && Object.values(note?.Tags)[0] ? (
							Object.values(note?.Tags).map((tag) => (
								<div key={tag.id} className="note-view-tag">
									<div
										className="tag"
										style={{ backgroundColor: `#${tag?.color}` }}
									>
										{tag?.name}
									</div>
								</div>
							))
						) : (
							<div className="tag note-in-trash">No Tags</div>
						)}
					</div>
				</div>
				{/* Notification box */}
				<div className="notification-div notification-move" ref={notification}>
					<i className="fa-solid fa-floppy-disk"></i>
					{notifications}
				</div>
			</>
		);
	} else {
		return (
			<div className="notebook-bg">
				<div className="notebook-container">
					<img src="/images/logo.svg" alt="bee" className="fly-bee" />
					<div className="notebook-ctnr-title">No notes in trash can</div>
				</div>
			</div>
		);
	}
};

export default NoteView;
