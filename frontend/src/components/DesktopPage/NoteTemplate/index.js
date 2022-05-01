import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const NoteTemplate = ({ title }) => {
	const { id } = useParams();
	const tag = useSelector((state) => state.tags[id]);

	let content = null;
	if (title == "Tag" && tag) {
		content = <div key={tag.id}>{tag.name}</div>;
	}

	return (
		<main className="note-control">
			<div className="note-sidebar">
				<div>{title}</div>
				<div>{content}</div>
			</div>
			<div className="note-view">Right Side</div>
		</main>
	);
};

export default NoteTemplate;
