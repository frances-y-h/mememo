import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import UpdatedAt from "../Tools/UpdatedAt";

const NoteCard = () => {
	const trash = useSelector((state) => state.trash);
	const trashOrdered = Object.values(trash).sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);
	if (trashOrdered.length) {
		return (
			<>
				{trashOrdered.map((note) => (
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
								<UpdatedAt updatedAt={note?.updatedAt} />
							</div>
						</div>
					</Link>
				))}
				<div className="note-box-end">
					<div className="tag">End of Trash</div>
				</div>
			</>
		);
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
