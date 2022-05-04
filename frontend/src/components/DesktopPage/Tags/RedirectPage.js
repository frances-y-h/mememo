import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const RedirectPage = ({ tagId }) => {
	const notes = useSelector((state) => {
		const arr = [];

		Object.values(state.notes).forEach((note) => {
			note.Tags.forEach((tag) => {
				if (tag.id === parseInt(tagId, 10)) {
					arr.push(note);
				}
			});
		});

		return arr;
	});

	const notesOrdered = notes.sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);

	// tags/:tagId/notes/:noteId

	return <Redirect to={`/tags/${tagId}/notes/${notesOrdered[0].id}`} />;
};
export default RedirectPage;
