import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import * as sessionActions from "../../store/session";

const Desktop = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const now = format(new Date(), "eeee, LLLL dd, yyyy");
	const [pad, setPad] = useState(user.scratchPad);

	const autoSave = useRef();

	// set greeting message
	const greeting = () => {
		const hour = new Date().getHours();
		let greeting;
		if (hour > 5 && hour < 12) {
			greeting = "Good morning";
		} else if (hour > 12 && hour < 18) {
			greeting = "Good afternoon";
		} else {
			greeting = "Good evening";
		}
		return greeting;
	};

	useEffect(() => {
		dispatch(sessionActions.updateScratchPad(user.id, { scratchPad: pad }));
		autoSave.current.classList.remove("pad-save-hidden");
		setTimeout(() => {
			autoSave.current.classList.add("pad-save-hidden");
		}, 1000);
	}, [pad, dispatch]);

	return (
		<main className="desktop-ctrl">
			<div className="desktop-greeting-wrap">
				<div className="desktop-greeting">
					{greeting()}, {user.username}
				</div>
				<div>{now}</div>
			</div>
			<div className="desktop-note-pad">
				<div className="desktop-notes">Notes</div>
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
			</div>
			{/* <div>Recently catured</div> */}
		</main>
	);
};

export default Desktop;
