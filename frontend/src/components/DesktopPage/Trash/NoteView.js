import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

import * as notesActions from "../../../store/notes";
import * as trashActions from "../../../store/trash";

const NoteView = () => {
	const { noteId } = useParams();
	const dispatch = useDispatch();
	const note = useSelector((state) => state.trash[noteId]);
	const [notifications, setNotifications] = useState("");
	const notification = useRef(null);

	if (note) {
		const ago = formatDistanceToNow(parseISO(note?.updatedAt), "MMM d, y");

		const putBack = async () => {
			const putBack = { title: note.title, trash: false };
			await dispatch(notesActions.trashNote(noteId, putBack));
			dispatch(trashActions.putBack(noteId));
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
						<div className="btn btn-mid1-solid" onClick={putBack}>
							<i className="fa-solid fa-arrow-right-to-bracket"></i>
							Put back to notebook
						</div>
					</div>
					<div className="note-view-update">Last edited {ago} ago</div>
					<div className="note-view-title note-in-trash">{note?.title}</div>
					<div className="note-view-content note-in-trash">{note?.content}</div>
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
		return <div>No notes</div>;
	}
};

export default NoteView;
