import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";

const Navigation = () => {
	const dispatch = useDispatch();

	const navBar = useRef();

	const demoLogin = () => {
		return dispatch(
			sessionActions.login({
				credential: "DemoUser",
				password: "password",
			})
		);
	};

	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			if (window.pageYOffset > 0) {
				navBar.current.classList.add("nav-shadow");
			} else {
				navBar.current.classList.remove("nav-shadow");
			}
		});
	}, []);

	return (
		<nav className="navigation-wrapper" ref={navBar}>
			<NavLink to="/">
				<div className="navigation-logo-wrapper">
					<img
						src="/images/logo.svg"
						alt="mememo"
						className="navigation-logo"
					/>
					<h1 className="navigation-title">mememo</h1>
				</div>
			</NavLink>
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
