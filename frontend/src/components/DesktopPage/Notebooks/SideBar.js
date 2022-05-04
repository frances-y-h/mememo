import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import NoteCard from "./NoteCard";

const SideBar = () => {
	const { notebookId, noteId } = useParams();
	const notebook = useSelector((state) => state.notebooks[notebookId]);
	const notes = Object.values(useSelector((state) => state.notes))?.filter(
		(note) =>
			note?.notebookId === parseInt(notebookId, 10) && note?.trash === false
	);

	return (
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
					<div className="note-title-empty">Edit Name</div>
				</div>
			</div>
			<div className="note-card-wrap">
				<NoteCard notebookId={notebookId} noteId={noteId} />
			</div>
		</div>
	);
};

export default SideBar;
