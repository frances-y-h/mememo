import { useSelector } from "react-redux";
import { useTrashModal } from "../../../context/TrashModalContext";

import NoteCard from "./NoteCard";

const SideBar = () => {
	const trash = useSelector((state) => state.trash);
	const { setToggleTrashModal } = useTrashModal();

	return (
		<div className="note-sidebar">
			<div className="note-title-box">
				<div className="note-title-wrap">
					<div className="note-title-icon">
						<i className="fa-solid fa-trash-can"></i>
						<div className="note-title">Trash</div>
					</div>
					<div
						className="note-title-empty"
						onClick={() => setToggleTrashModal("")}
					>
						Empty Trash
					</div>
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
