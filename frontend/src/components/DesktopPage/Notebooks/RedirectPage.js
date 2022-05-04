import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectPage = () => {
	const { notebookId } = useParams();
	const notes = Object.values(useSelector((state) => state.notes))?.filter(
		(note) =>
			note?.notebookId === parseInt(notebookId, 10) && note?.trash === false
	);
	const notesOrdered = notes.sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);

	if (notesOrdered.length) {
		return <Redirect to={`/notebooks/${notebookId}/${notesOrdered[0]?.id}`} />;
	} else {
		return (
			<div className="notebook-bg">
				<div className="notebook-container">
					<img src="/images/logo.svg" alt="bee" className="fly-bee" />
					<div className="notebook-ctnr-title">No notes in this notebook</div>
				</div>
			</div>
		);
	}
};

export default RedirectPage;
