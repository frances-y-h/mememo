import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import UpdatedAt from "../Tools/UpdatedAt";
import NoteContent from "../Notes/NoteContent";
import Favorite from "../Tools/Favorite";

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

	const OrderedNotes = notes.sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);

	if (notes && OrderedNotes[0]) {
		return (
			<>
				{OrderedNotes.map((note) => (
					<Link to={`/tags/${tagId}/notes/${note.id}`} key={note.id}>
						<div className="note-box">
							<div className="note-title">
								{note.title}
								<Favorite noteId={note?.id} />
							</div>
							<NoteContent content={note?.content} />
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
