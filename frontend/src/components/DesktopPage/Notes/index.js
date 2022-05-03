import { Route } from "react-router-dom";

import SideBar from "./SideBar";
import NoteView from "./NoteView";
// import NotePage from "../Tags/notePage";

const NotesPage = () => {
	return (
		<main className="note-control">
			<SideBar />
			<Route path="/notes" exact>
				<NoteView />
			</Route>
			<Route path="/notes/new/*" exact>
				<div>new Notes</div>
			</Route>
			<Route path="/notes/:noteId">
				<NoteView />
			</Route>
		</main>
	);
};

export default NotesPage;
