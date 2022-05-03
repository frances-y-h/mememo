import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

const NoteCard = () => {
	const trash = useSelector((state) => state.trash);

	if (Object.keys(trash).length) {
		return Object.values(trash).map((note) => (
			<Link to={`/trash/${note?.id}`} key={note?.id}>
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
						{/* {formatDistanceToNow(parseISO(note?.updatedAt))} ago */}
					</div>
				</div>
			</Link>
		));
	} else {
		return (
			<div className="no-notes-wrap">
				<i className="fa-solid fa-trash-can fa-5x no-notes-icon"></i>
				<div>Empty Trash Can</div>
			</div>
		);
	}
};

export default NoteCard;
