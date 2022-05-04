import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import UpdatedAt from "../Tools/UpdatedAt";

const NoteCard = ({ notebookId, noteId }) => {
	const notebook = useSelector((state) => state.notebooks[notebookId]);
	const notes = Object.values(useSelector((state) => state?.notes))?.filter(
		(note) =>
			note?.notebookId === parseInt(notebookId, 10) && note?.trash === false
	);

	const notesOrdered = notes.sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);

	if (notesOrdered.length) {
		return (
			<>
				{notesOrdered.map((note) => (
					<Link to={`/notebooks/${notebookId}/${note?.id}`} key={note?.id}>
						<div className="note-box">
							<div className="note-title">{note?.title}</div>
							<div className="note-content">{note?.content}</div>
							<div className="dk-note-tags">
								{note &&
									note?.Tags.map((tag) => (
										<div
											key={tag.id}
											className="tag"
											style={{ backgroundColor: `#${tag.color}` }}
										>
											{tag.name}
										</div>
									))}
							</div>
							<div className="note-update">
								<UpdatedAt updatedAt={note?.updatedAt} />
							</div>
						</div>
					</Link>
				))}
				<div className="note-box-end">
					<div className="tag">End of Notebook</div>
				</div>
			</>
		);
	} else {
		return (
			<div className="no-notes-wrap">
				<img
					src="/images/icon/note-not-found.svg"
					alt="Not found"
					className="no-notes-icon"
				/>
				<div>No notes found</div>
			</div>
		);
	}
};

export default NoteCard;
