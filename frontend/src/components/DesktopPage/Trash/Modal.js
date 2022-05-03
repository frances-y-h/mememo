import { useSelector, useDispatch } from "react-redux";

import { useTrashModal } from "../../../context/TrashModalContext";
import * as trashActions from "../../../store/trash";

const Modal = () => {
	const { toggleTrashModal, setToggleTrashModal } = useTrashModal();
	const dispatch = useDispatch();
	const trash = useSelector((state) => state.trash);
	const userId = useSelector((state) => state.session.user.id);

	const emptyTrash = async () => {
		const trashIdArr = Object.keys(trash);
		await dispatch(trashActions.emptyAllTrash());
		// notitifcation "Trash has been emptied"
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
