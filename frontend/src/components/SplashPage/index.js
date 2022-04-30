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
				<div className="splah-main-wrap">
					<div className="splash-slogan">
						A powerful memo app for hard working bees
						<img
							className="splash-slogan-bee"
							src="/images/logo.svg"
							alt="bee"
						/>
					</div>
					<div className="splash-main-description">
						Remember everything and tackle any project with your notes, tasks,
						and schedule all in one place.
					</div>
					<NavLink className="btn" to="/signup">
						Sign up for free
					</NavLink>
					<NavLink className="form-link" to="/login">
						Already have an account? Log in
					</NavLink>
				</div>
				<div className="splash-example-wrap">
					<img className="laptop" src="/images/laptop.jpg" alt="laptop" />
					<div className="splash-example-right">
						<div className="splash-example-div">
							<div className="splash-example-title">WORK ANYWHERE</div>
							<div className="splash-example-description">
								Keep important info handy—your notes sync automatically to all
								your devices.
							</div>
						</div>
						<div className="splash-example-div">
							<div className="splash-example-title">REMEMBER EVERYTHING</div>
							<div className="splash-example-description">
								Make notes more useful by adding text, images, audio, scans,
								PDFs, and documents.
							</div>
						</div>
						<div className="splash-example-div">
							<div className="splash-example-title">TURN TO-DO INTO DONE</div>
							<div className="splash-example-description">
								Bring your notes, tasks, and schedules together to get things
								done more easily.
							</div>
						</div>
						<div className="splash-example-div">
							<div className="splash-example-title">FIND THINGS FAST</div>
							<div className="splash-example-description">
								Get what you need, when you need it with powerful, flexible
								search capabilities.
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default SplashPage;
