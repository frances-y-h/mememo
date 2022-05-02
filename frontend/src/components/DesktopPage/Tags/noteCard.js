import { NavLink, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

const NoteCard = ({ tagId }) => {
	const tag = useSelector((state) => state.tags[tagId]);
	console.log("******", tagId);

	const notes = tag?.Notes;

	if (notes && notes[0]) {
		return notes.map((note) => (
			<NavLink to={`/tags/${tagId}/notes/${note.id}`}>
				<div key={note.id} className="note-box">
					<div className="note-title">{note.title}</div>
					<div className="note-content">{note.content}</div>
					<div className="dk-note-tags">
						{note &&
							note.Tags.map((tag) => (
								<Link to={`/tags/${tag.id}`} key={tag.id}>
									<div
										className="tag"
										style={{ backgroundColor: `#${tag.color}` }}
									>
										{tag.name}
									</div>
								</Link>
							))}
					</div>
					<div className="note-update">
						{formatDistanceToNow(parseISO(note.updatedAt))} ago
					</div>
				</div>
			</NavLink>
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
