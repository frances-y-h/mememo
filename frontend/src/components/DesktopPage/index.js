import React, { useState, useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation";
import "./Desktop.css";

const DesktopPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/login" />;

	const logout = (e) => {
		return dispatch(sessionActions.logoutUser());
	};

	return (
		<div className="desktop-container">
			<Navigation sessionUser={sessionUser} />
			<main></main>
		</div>
	);
};

export default DesktopPage;
