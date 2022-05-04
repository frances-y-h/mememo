import { Route } from "react-router-dom";

import SideBar from "./SideBar";
import NoteView from "./NoteView";
import RedirectPage from "./RedirectPage";

const TrashPage = () => {
	return (
		<main className="note-control">
			<SideBar />
			<Route path="/trash/:noteId">
				<NoteView />
			</Route>
			<Route path="/trash">
				<RedirectPage />
			</Route>
		</main>
	);
};

export default TrashPage;
