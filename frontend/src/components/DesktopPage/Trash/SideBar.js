import { useSelector } from "react-redux";

import NoteCard from "./NoteCard";

const SideBar = () => {
	const trash = useSelector((state) => state.trash);

	return (
		<div className="note-sidebar">
			<div className="note-title-box">
				<div className="note-title-wrap">
					<div className="note-title-icon">
						<i className="fa-solid fa-trash-can"></i>
						<div className="note-title">Trash</div>
					</div>
					<div className="note-title-empty">Empty Trash</div>
				</div>
				<div className="note-title-ctrl">
					<div className="note-title-ctrl-count">
						Total {Object.values(trash).length} notes
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
