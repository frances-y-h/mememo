import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NoteCard from "./NoteCard";

const SideBar = () => {
	const notes = useSelector((state) => state.notes);

	return (
		<div className="note-sidebar">
			<div className="note-title-box">
				<div className="note-title-wrap">
					<div className="note-title-icon">
						<i className="fa-solid fa-file-lines"></i>
						<div className="note-title">Notes</div>
					</div>
					<Link to="/notes/new">
						<div className="note-title-empty">New Note</div>
					</Link>
				</div>
				<div className="note-title-ctrl">
					<div className="note-title-ctrl-count">
						Total {Object?.keys(notes)?.length} notes
					</div>
				</div>
			</div>
			<div>
				<NoteCard />
			</div>
		</div>
	);
};
export default SideBar;
