import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link, useHistory } from "react-router-dom";

import { useDisableEdit } from "../../../context/DisableEditContext";
import { useNotification } from "../../../context/NotificationContext";

import UpdatedAt from "../Tools/UpdatedAt";

const Notes = () => {
	const notes = useSelector((state) => state.notes);
	const notesOrdered = Object.values(notes).sort((a, b) =>
		b.updatedAt.localeCompare(a.updatedAt)
	);
	const history = useHistory();
	const { setDisableEdit } = useDisableEdit();
	const { setToggleNotification, setNotificationMsg } = useNotification();

	return (
		<div className="desktop-notes">
			<div className="desktop-notes-top">
				<Link to="/notes">
					<div className="desktop-notes-top-notes">
						<div>NOTES</div>
						<i className="fa-solid fa-angle-right"></i>
					</div>
				</Link>
				<div
					className="desktop-notes-top-notes"
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
					<img
						src="/images/icon/note-add.svg"
						alt="Add Note"
						className="icon18"
					/>
				</div>
			</div>
			<div className="dt-notes-wrap">
				{notesOrdered.map((note) => (
					<Link key={note?.id} to={`/notes/${note?.id}`}>
						<div className="desktop-note">
							<div className="dk-note-title">{note?.title}</div>
							<div className="dk-note-update">
								<UpdatedAt updatedAt={note?.updatedAt} />
							</div>
							<div className="dk-note-content">{note?.content}</div>
							<div className="dk-note-tags">
								{note?.Tags[0] &&
									note?.Tags?.map((tag) => (
										<div
											key={tag.id}
											className="tag"
											style={{ backgroundColor: `#${tag?.color}` }}
										>
											{tag?.name}
										</div>
									))}
							</div>
						</div>
					</Link>
				))}

				<div
					className="desktop-note dk-note-new"
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
					<img
						className="dk-note-new-circle"
						src="/images/icon/note-new-circle.svg"
						alt="Add Note"
					/>
					<div className="dk-note-new-title">Create new note</div>
				</div>
			</div>
			<div className="desktop-notes-btm"></div>
		</div>
	);
};

export default Notes;
