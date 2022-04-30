import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";

const Navigation = () => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);

	const demoLogin = () => {
		return dispatch(
			sessionActions.login({
				credential: "DemoUser",
				password: "password",
			})
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<nav className="navigation-wrapper">
			<div className="navigation-logo-wrapper">
				<img src="/images/logo.svg" alt="mememo" className="navigation-logo" />
				<div className="navigation-title">mememo</div>
			</div>
			<div className="navigation-links">
				<div className="btn btn-no-border" onClick={demoLogin}>
					Demo Login
				</div>
				<NavLink className="btn btn-mid1" to="/login">
					Login
				</NavLink>
			</div>
		</nav>
	);
};

export default Navigation;
