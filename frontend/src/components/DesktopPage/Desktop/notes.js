import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const Notes = () => {
	const notes = Object.values(useSelector((state) => state.notes));
	return (
		<div className="desktop-notes">
			<div className="desktop-notes-top">
				<Link to="/notes">
					<div className="desktop-notes-top-notes">
						<div>NOTES</div>
						<i className="fa-solid fa-angle-right"></i>
					</div>
				</Link>
				<div className="desktop-notes-top-notes">
					<img
						src="/images/icon/note-add.svg"
						alt="Add Note"
						className="icon18"
					/>
				</div>
			</div>
			<div className="dt-notes-wrap">
				{notes[0] &&
					notes.map((note) => (
						<div className="desktop-note" key={note.id}>
							<div className="dk-note-title">{note.title}</div>
							<div className="dk-note-update">
								{formatDistanceToNow(parseISO(note.updatedAt))} ago
							</div>
							<div className="dk-note-content">{note.content}</div>
							<div className="dk-note-tags">
								{note.Tags[0] &&
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
						</div>
					))}
				<div className="desktop-note dk-note-new">
					<img
						className="dk-note-new-circle"
						src="/images/icon/note-new-circle.svg"
						alt="Add Note"
					/>
					<div className="dk-note-new-title">Create new note</div>
				</div>
			</div>
			<div className="desktop-notes-btm"></div>
		</div>
	);
};

export default Notes;
