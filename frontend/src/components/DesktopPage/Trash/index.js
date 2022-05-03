import { Route } from "react-router-dom";

import SideBar from "./SideBar";
import NoteView from "./NoteView";
const TrashPage = () => {
	return (
		<main className="note-control">
			<SideBar />
			<Route path="/trash/:noteId">
				<NoteView />
			</Route>
		</main>
	);
};

export default TrashPage;
