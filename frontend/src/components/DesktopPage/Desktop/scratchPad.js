import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";

const ScratchPad = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [pad, setPad] = useState(user.scratchPad);
	const autoSave = useRef();

	useEffect(() => {
		dispatch(sessionActions.updateScratchPad(user.id, { scratchPad: pad }));
		autoSave.current.classList.remove("pad-save-hidden");
		setTimeout(() => {
			autoSave.current.classList.add("pad-save-hidden");
		}, 1000);
	}, [pad, dispatch]);

	return (
		<div className="scratch-pad">
			<div className="pad-title">
				<div>SCRATCH PAD</div>
				<div className="pad pad-save-hidden" ref={autoSave}>
					auto saved
				</div>
			</div>
			<textarea
				className="pad-textarea"
				type="text"
				name="scratchPad"
				placeholder="Write something..."
				value={pad}
				onChange={(e) => setPad(e.target.value)}
			/>
		</div>
	);
};

export default ScratchPad;
