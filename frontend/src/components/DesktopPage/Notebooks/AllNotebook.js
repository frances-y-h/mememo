import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllNotebook = ({ notebook }) => {
	const notes = useSelector((state) => {
		const arr = [];
		Object.values(state.notes).forEach((note) => {
			if (note?.notebookId === notebook?.id) {
				arr.push(note);
			}
		});
		return arr;
	});

	return (
		<div>
			<Link to={`/notebooks/${notebook?.id}`}>
				<div className="all-notebook-div" key={notebook?.id}>
					<i className="fa-solid fa-book"></i>
					{notebook?.name}
					<div className="all-notebook-total">Total {notes?.length} notes</div>
				</div>
			</Link>
			<div>
				{notes.map((note) => (
					<Link
						key={note?.id}
						to={`/notebooks/${notebook?.id}/${note?.id}`}
						className="all-note-div"
					>
						<i className="fa-solid fa-file-lines"></i>
						{note?.title}
					</Link>
				))}
			</div>
		</div>
	);
};

export default AllNotebook;
