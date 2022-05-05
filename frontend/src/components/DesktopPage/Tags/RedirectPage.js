import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const RedirectPage = ({ tagId }) => {
	const notes = useSelector((state) => {
		const arr = [];

		Object.values(state.notes).forEach((note) => {
			note?.Tags.forEach((tag) => {
				if (tag?.id === parseInt(tagId, 10)) {
					arr.push(note);
				}
			});
		});

		return arr;
	});

	const notesOrdered = notes.sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);

	if (notesOrdered[0]) {
		return <Redirect to={`/tags/${tagId}/notes/${notesOrdered[0]?.id}`} />;
	} else {
		return (
			<div className="notebook-bg">
				<div className="notebook-container">
					<img src="/images/logo.svg" alt="bee" className="fly-bee" />
					<div className="notebook-ctnr-title">No notes with this tag</div>
				</div>
			</div>
		);
	}
};
export default RedirectPage;
