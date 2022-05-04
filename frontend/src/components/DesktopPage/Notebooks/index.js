import { Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import NoteView from "../Notes/NoteView";
import RedirectPage from "./RedirectPage";
import AllNotebooks from "./AllNotebooks";

const NotebooksPage = () => {
	return (
		<Switch>
			<Route path="/notebooks" exact>
				<AllNotebooks />
			</Route>
			<Route path="/notebooks/:notebookId" exact>
				<main className="note-control">
					<SideBar />
					<RedirectPage />
				</main>
			</Route>
			<Route path="/notebooks/:notebookId/:noteId" exact>
				<main className="note-control">
					<SideBar />
					<NoteView />
				</main>
			</Route>
		</Switch>
	);
};

export default NotebooksPage;
