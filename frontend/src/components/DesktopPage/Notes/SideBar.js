import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDisableEdit } from "../../../context/DisableEditContext";
import { useNotification } from "../../../context/NotificationContext";

import NoteCard from "./NoteCard";

const SideBar = () => {
	const notes = useSelector((state) => state.notes);
	const history = useHistory();
	const { setDisableEdit } = useDisableEdit();
	const { setToggleNotification, setNotificationMsg } = useNotification();

	return (
		<div className="note-sidebar">
			<div className="note-title-box">
				<div className="note-title-wrap">
					<div className="note-title-icon">
						<i className="fa-solid fa-file-lines"></i>
						<div className="note-title">Notes</div>
					</div>
					<div
						className="note-title-empty"
						onClick={() => {
							setDisableEdit(false);
							setNotificationMsg("Start adding something!");
							setToggleNotification("");

							setTimeout(() => {
								setToggleNotification("notification-move");
							}, 2000);
							history.push("/notes/new");
						}}
					>
						New Note
					</div>
				</div>
				<div className="note-title-ctrl">
					<div className="note-title-ctrl-count">
						Total {Object?.keys(notes)?.length} notes
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
