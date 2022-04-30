import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";

const User = ({ sessionUser }) => {
	const { username, avatarUrl, id } = sessionUser;
	const [showUserDD, setShowUserDD] = useState(false);

	const dispatch = useDispatch();

	const userDD = useRef();
	const modal = useRef();

  const logout = (e) => {
		return dispatch(sessionActions.logoutUser());
	};

	const closeModal = () => {
		userDD.current.classList.add("nav-dropdown-hide");
		modal.current.classList.add("nav-dropdown-hide");
	};

	useEffect(() => {
		if (showUserDD) {
			userDD.current.classList.remove("nav-dropdown-hide");
			modal.current.classList.remove("nav-dropdown-hide");
		} else {
			userDD.current.classList.add("nav-dropdown-hide");
			modal.current.classList.add("nav-dropdown-hide");
		}
	}, [showUserDD]);

  return (
    <>
      <div
				className="modal nav-dropdown-hide"
				ref={modal}
				onClick={closeModal}
			></div>
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
