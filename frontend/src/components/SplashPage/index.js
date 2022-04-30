import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Navigation from "./navigation";
import Footer from "./footer";

const SplashPage = () => {
	const sessionUser = useSelector((state) => state.session.user);
	if (sessionUser) return <Redirect to="/desktop" />;

	return (
		<div className="splash-page">
			<Navigation />
			<main className="splash-page-main">
				<div>title and slogan</div>
				<div>Picture of laptop and description</div>
			</main>
			<Footer />
		</div>
	);
};

export default SplashPage;
