import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import * as sessionActions from "../../store/session";
import ScratchPad from "./scratchPad";

const Desktop = () => {
	const user = useSelector((state) => state.session.user);
	const now = format(new Date(), "eeee, LLLL dd, yyyy");
	const notes = Object.values(useSelector((state) => state.notes));

	// formatDistanceToNow(parseISO(note.updatedAt))

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
						<Link to="/notes">
							<div className="desktop-notes-top-notes">
								<div>NOTES</div>
								<i className="fa-solid fa-angle-right"></i>
							</div>
						</Link>
						<div className="desktop-notes-top-notes">
							<img src="/images/icon/note-add.svg" className="icon18" />
						</div>
					</div>
					<div className="dt-notes-wrap">
						{notes[0] &&
							notes.map((note) => (
								<div className="desktop-note" key={note.id}>
									<div className="dk-note-title">{note.title}</div>
									<div className="dk-note-update">
										{formatDistanceToNow(parseISO(note.updatedAt))} ago
									</div>
									<div className="dk-note-content">{note.content}</div>
									<div className="dk-note-tags">
										{note.Tags[0] &&
											note.Tags.map((tag) => (
												<div
													className="tag"
													style={{ backgroundColor: `#${tag.color}` }}
												>
													{tag.name}
												</div>
											))}
									</div>
								</div>
							))}
						<div className="desktop-note dk-note-new">
							<img
								className="dk-note-new-circle"
								src="/images/icon/note-new-circle.svg"
							/>
							<div className="dk-note-new-title">Create new note</div>
						</div>
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
