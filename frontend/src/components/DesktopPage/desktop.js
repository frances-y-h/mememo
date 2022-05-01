import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import * as sessionActions from "../../store/session";
import ScratchPad from "./scratchPad";

const Desktop = () => {
	const user = useSelector((state) => state.session.user);
	const now = format(new Date(), "eeee, LLLL dd, yyyy");
	const notes = Object.values(useSelector((state) => state.notes));

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
				<div className="desktop-notes">
					<div className="desktop-notes-top">
						<div className="desktop-notes-top-notes">
							<div>NOTES</div>
							<i className="fa-solid fa-angle-right"></i>
						</div>
						<div className="desktop-notes-top-notes">
							<img src="/images/icon/note-add.svg" className="icon18" />
						</div>
					</div>
					<div className="dt-notes-wrap">
						{notes[0] &&
							notes.map((note) => (
								<div className="desktop-note" key={note.id}>
									{note.title}
								</div>
							))}
						<div className="desktop-note">New Note</div>
						<div className="desktop-note">New Note</div>
						<div className="desktop-note">New Note</div>
						<div className="desktop-note">New Note</div>
						<div className="desktop-note">New Note</div>
						<div className="desktop-note">New Note</div>
					</div>
					<div className="desktop-notes-btm"></div>
				</div>
				<ScratchPad />
			</div>
			{/* <div>Recently catured</div> */}
		</main>
	);
};

export default Desktop;
