import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";

const NoteCard = ({ tag }) => {
	if (tag && tag.Notes[0]) {
		return tag.Notes.map((note) => (
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
		));
	} else {
		return <div>Sorry no notes</div>;
	}
};

export default NoteCard;
