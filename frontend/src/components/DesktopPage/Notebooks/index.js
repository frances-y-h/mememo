import { Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import NoteView from "../Notes/NoteView";

const NotebooksPage = () => {
	return (
		<main className="note-control">
			<Switch>
				<Route path="/notebooks" exact>
					<SideBar />
					<div>All notes</div>
				</Route>
				<Route path="/notebooks/:notebookId" exact>
					<SideBar />
					<div>Here</div>
				</Route>
				<Route path="/notebooks/:notebookId/:noteId" exact>
					<SideBar />
					<NoteView />
				</Route>
			</Switch>
		</main>
	);
};

export default NotebooksPage;
