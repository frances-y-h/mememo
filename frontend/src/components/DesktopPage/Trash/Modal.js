import { useSelector, useDispatch } from "react-redux";

import { useTrashModal } from "../../../context/TrashModalContext";
import { useNotification } from "../../../context/NotificationContext";
import * as trashActions from "../../../store/trash";

const Modal = () => {
	const { toggleTrashModal, setToggleTrashModal } = useTrashModal();
	const { setToggleNotification, setNotificationMsg } = useNotification();
	const dispatch = useDispatch();
	const trash = useSelector((state) => state.trash);

	const emptyTrash = async () => {
		const trashIdArr = Object.keys(trash);
		await dispatch(trashActions.emptyAllTrash());
		setToggleTrashModal("hidden");
		// notitifcation "Trash has been emptied"
		setNotificationMsg("Trash has been emptied");
		setToggleNotification("");
		setTimeout(() => {
			setToggleNotification("notification-move");
		}, 2000);
	};

	return (
		<div
			className={`modalBg5 ${toggleTrashModal}`}
			onClick={() => setToggleTrashModal("hidden")}
		>
			<div className="form-control" onClick={(e) => e.stopPropagation()}>
				<div className="trash-modal-title">
					<div>Empty Trash?</div>
					<div
						className="modal-x"
						onClick={() => setToggleTrashModal("hidden")}
					>
						X
					</div>
				</div>
				<div className="trash-modal-content">
					Are you sure you want to empty the trash? All items in the trash will
					be permanently deleted and cannot be restored.
				</div>
				<div className="trash-modal-btn-wrap">
					<button
						className="btn btn-black"
						onClick={() => setToggleTrashModal("hidden")}
					>
						Cancel
					</button>
					<button className="btn btn-alert-solid" onClick={emptyTrash}>
						Empty Trash
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
