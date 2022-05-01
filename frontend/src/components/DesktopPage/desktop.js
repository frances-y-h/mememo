import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Desktop = () => {
	const { username, scratchPad } = useSelector((state) => state.session.user);
	const now = format(new Date(), "eeee, LLLL dd, yyyy");
	const [pad, setPad] = useState(scratchPad);

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

	useEffect(() => {}, [pad]);

	return (
		<main className="desktop-ctrl">
			<div className="desktop-greeting-wrap">
				<div className="desktop-greeting">
					{greeting()}, {username}
				</div>
				<div>{now}</div>
			</div>
			<div className="desktop-note-pad">
				<div className="desktop-notes">Notes</div>
				<div className="scratch-pad">
					<div className="pad-title">
						<div>SCRATCH PAD</div>
						<div>auto saved</div>
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
