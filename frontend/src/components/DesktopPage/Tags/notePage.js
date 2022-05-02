import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const NotePage = () => {
	const { tagId, noteId } = useParams();
	const note = useSelector((state) => state.notes[noteId]);
	return (
		<>
			<div className="note-view-notebook-wrap">
				<div className="note-view-notebook">
					<i class="fa-solid fa-book"></i>
					{note.Notebook.name}
				</div>
				<div className="note-view-notebook-edit">
					<i class="fa-solid fa-pen-to-square"></i>
					<i class="fa-solid fa-trash-can"></i>
				</div>
			</div>
			<div className="note-view-update">Last edited on {note.updatedAt}</div>
			<div className="note-view-title">{note.title}</div>
			<div className="note-view-content">{note.content}</div>
			<div className="note-view-tags">
				{note.Tags.map((tag) => (
					<div
						key={tag.id}
						className="tag"
						style={{ backgroundColor: `#${tag.color}` }}
					>
						{tag.name}
					</div>
				))}
			</div>
		</>
	);
};

export default NotePage;
