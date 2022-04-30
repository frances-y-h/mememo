import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";

const User = ({ sessionUser }) => {
	const { username, avatarUrl } = sessionUser;
	const [showUserDD, setShowUserDD] = useState(false);

	const dispatch = useDispatch();

	const userDD = useRef();
	const modal = useRef();

	const logout = (e) => {
		return dispatch(sessionActions.logoutUser());
	};

	const closeModal = () => {
		userDD.current.classList.add("hidden");
		modal.current.classList.add("hidden");
	};

	useEffect(() => {
		if (showUserDD) {
			userDD.current.classList.remove("hidden");
			modal.current.classList.remove("hidden");
		} else {
			userDD.current.classList.add("hidden");
			modal.current.classList.add("hidden");
		}
	}, [showUserDD]);

	return (
		<>
			{/* modal */}
			<div className="modalBg1 hidden" ref={modal} onClick={closeModal}></div>
			<div className="nav-top" onClick={() => setShowUserDD(!showUserDD)}>
				<img src={avatarUrl} alt={username} className="nav-avatar-img" />
				<div>{username}</div>
			</div>
			<div className="nav-user-dd" ref={userDD}>
				<div className="nav-user-dd-div" onClick={logout}>
					Logout as {username}{" "}
				</div>
			</div>
		</>
	);
};

export default User;
