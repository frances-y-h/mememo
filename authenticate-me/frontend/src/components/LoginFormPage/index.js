import React, { useState, useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const errDiv = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	useEffect(() => {
		if (!sessionUser) {
			if (errors.length) {
				errDiv.current.classList.remove("hidden");
			} else {
				errDiv.current.classList.add("hidden");
			}
		}
	}, [errors, sessionUser]);

	if (sessionUser) return <Redirect to="/desktop" />;

	return (
		<div className="container-ctr">
			<form className="form-control" onSubmit={handleSubmit}>
				<div className="login-title">
					<img className="logo" src="/images/logo.svg" alt="mememo" />
					<h1 className="title">memeo</h1>
					<div className="slogan">
						A powerful memo app for hard working bees
					</div>
				</div>
				<div className="form-group form-gap20">
					<div ref={errDiv} className="error-list">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</div>
					<div className="form-input-ctrl">
						<i className="fa-solid fa-user"></i>
						<input
							type="text"
							value={credential}
							onChange={(e) => setCredential(e.target.value)}
							required
							placeholder="Username or Email"
							className="input"
						/>
					</div>

					<div className="form-input-ctrl">
						<i className="fa-solid fa-lock"></i>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Password"
							className="input"
						/>
					</div>
					<button className="btn" type="submit">
						Login
					</button>
					<div className="form-group form-gap20">
						<div className="form-link">Login as Demo User</div>
						<div className="form-group">
							<div className="form-link-label">Don't have an account?</div>
							<Link to="/signup" className="form-link">
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default LoginFormPage;
