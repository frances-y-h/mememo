import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

const NoteCard = ({ tagId }) => {
	const notes = useSelector((state) => {
		const notesArr = [];
		Object.values(state.notes).forEach((note) => {
			if (note?.trash === false) {
				note.Tags.forEach((tag) => {
					// TagId is a string
					if (tag.id === parseInt(tagId, 10)) {
						notesArr.push(note);
					}
				});
			}
		});

		return notesArr;
	});

	if (notes && notes[0]) {
		return notes.map((note) => (
			<Link to={`/tags/${tagId}/notes/${note.id}`} key={note.id}>
				<div className="note-box">
					<div className="note-title">{note.title}</div>
					<div className="note-content">{note.content}</div>
					<div className="dk-note-tags">
						{note &&
							note.Tags.map((tag) => (
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
						{formatDistanceToNow(parseISO(note.updatedAt))} ago
					</div>
				</div>
			</Link>
		));
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
