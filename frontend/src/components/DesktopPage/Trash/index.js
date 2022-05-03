import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import SideBar from "./SideBar";
import NoteView from "./NoteView";

const TrashPage = () => {
	const trash = useSelector((state) => state.trash);
	return (
		<>
			<main className="note-control">
				<SideBar />
				<Route path="/trash/:noteId">
					<NoteView />
				</Route>
			</main>
		</>
	);
};

export default TrashPage;
