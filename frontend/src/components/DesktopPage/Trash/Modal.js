import { useDispatch } from "react-redux";

import { useModal } from "../../../context/ModalContext";
import { useNotification } from "../../../context/NotificationContext";
import * as trashActions from "../../../store/trash";

const Modal = () => {
	const { toggleTrashModal, setToggleTrashModal } = useModal();
	const { setToggleNotification, setNotificationMsg } = useNotification();
	const dispatch = useDispatch();

	const emptyTrash = async () => {
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
				<div className="modal-title">
					<div>Empty Trash?</div>
					<div
						className="modal-x"
						onClick={() => setToggleTrashModal("hidden")}
					>
						X
					</div>
				</div>
				<div className="modal-content">
					Are you sure you want to empty the trash? All items in the trash will
					be permanently deleted and cannot be restored.
				</div>
				<div className="modal-btn-wrap-border">
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
