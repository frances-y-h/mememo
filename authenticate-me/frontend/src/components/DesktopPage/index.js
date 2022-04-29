import React, { useState, useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, NavLink } from "react-router-dom";

const DesktopPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	// if no session.user, redirect to log in page

	if (!sessionUser) return <Redirect to="/login" />;

	const logout = (e) => {
		return dispatch(sessionActions.logoutUser());
	};

	return <button onClick={logout}>Log out</button>;
};

export default DesktopPage;
