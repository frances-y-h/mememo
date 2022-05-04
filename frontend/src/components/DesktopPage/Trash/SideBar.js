import { useSelector } from "react-redux";
import { useModal } from "../../../context/ModalContext";

import NoteCard from "./NoteCard";

const SideBar = () => {
	const trash = useSelector((state) => state.trash);
	const { setToggleTrashModal } = useModal();

	return (
		<div className="note-sidebar">
			<div className="note-title-box">
				<div className="note-title-wrap">
					<div className="note-title-icon">
						<i className="fa-solid fa-trash-can"></i>
						<div className="note-title">Trash</div>
					</div>
					{Object.keys(trash).length > 0 ? (
						<div
							className="note-title-empty"
							onClick={() => setToggleTrashModal("")}
						>
							Empty Trash
						</div>
					) : null}
				</div>
				<div className="note-title-ctrl">
					<div className="note-title-ctrl-count">
						Total {Object.keys(trash).length} notes
					</div>
				</div>
			</div>
			<div className="note-card-wrap">
				<NoteCard />
			</div>
		</div>
	);
};

export default SideBar;
