import { useSelector } from "react-redux";
import { format } from "date-fns";
import ScratchPad from "./scratchPad";
import Notes from "./notes";

const Desktop = () => {
	const user = useSelector((state) => state.session.user);
	const now = format(new Date(), "eeee, LLLL dd, yyyy");

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

	return (
		<main className="desktop-ctrl">
			<div className="desktop-greeting-wrap">
				<div className="desktop-greeting">
					{greeting()}, {user.username}
				</div>
				<div>{now}</div>
			</div>
			<div className="desktop-note-pad">
				<Notes />
				<ScratchPad />
			</div>
			{/* <div>Recently catured</div> */}
		</main>
	);
};

export default Desktop;
