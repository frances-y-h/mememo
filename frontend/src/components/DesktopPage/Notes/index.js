import { useSelector } from "react-redux";

const NotesPage = () => {
	const notes = Object.values(useSelector((state) => state.notes));
	return (
		<main>
			<h1>Notes</h1>
			{notes[0] && notes.map((note) => <div key={note.id}>{note.title}</div>)}
		</main>
	);
};

export default NotesPage;
