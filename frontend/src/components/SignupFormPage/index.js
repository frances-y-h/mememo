import React, { useState, useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [usernameErr, setUsernameErr] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
	const [errors, setErrors] = useState([]);
	const [disable, setDisable] = useState(true);

	const errDiv = useRef();
	const usernameEl = useRef();
	const passwordEl = useRef();
	const confirmPasswordEl = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		return dispatch(sessionActions.signup({ username, email, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

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

	useEffect(() => {
		if (!sessionUser) {
			if (errors.length) {
				errDiv.current.classList.remove("hidden");
			} else {
				errDiv.current.classList.add("hidden");
			}
		}
	}, [errors, sessionUser]);

	// Tooltip reminder
	useEffect(() => {
		if (!sessionUser) {
			if (email.length && (username.length < 4 || username.length > 30)) {
				usernameEl.current.classList.remove("hidden");
				setUsernameErr("Must be between 4 to 30 characters");
			} else {
				usernameEl.current.classList.add("hidden");
				setTimeout(() => {
					setUsernameErr("");
				}, 250);
			}

			if (
				username.length &&
				email.length &&
				(password.length < 6 || password.length > 256)
			) {
				passwordEl.current.classList.remove("hidden");
				setPasswordErr("Must be at least 6 characters");
			} else {
				passwordEl.current.classList.add("hidden");
				setTimeout(() => {
					setPasswordErr("");
				}, 250);
			}

			if (confirmPassword !== password) {
				confirmPasswordEl.current.classList.remove("hidden");
				setConfirmPasswordErr("Does not match password");
			} else {
				confirmPasswordEl.current.classList.add("hidden");
				setTimeout(() => {
					setConfirmPasswordErr("");
				}, 250);
			}
		}
	}, [confirmPassword, password, username, email, sessionUser]);

	// Sign up button disable toggles
	useEffect(() => {
		if (!sessionUser) {
			if (
				!usernameErr.length &&
				!passwordErr.length &&
				!confirmPasswordErr.length &&
				username &&
				email &&
				password &&
				confirmPassword
			) {
				setDisable(false);
			} else {
				setDisable(true);
			}
		}
	}, [
		usernameErr,
		passwordErr,
		confirmPasswordErr,
		sessionUser,
		username,
		email,
		password,
		confirmPassword,
	]);

	if (sessionUser) return <Redirect to="/desktop" />;

	return (
		<div className="container-ctr">
			<form className="form-control" onSubmit={handleSubmit}>
				<div className="login-title">
					<img className="logo" src="/images/logo.svg" alt="mememo" />
					<h1 className="title">mememo</h1>
					<div className="slogan">
						A powerful memo app for hard working bees
					</div>
				</div>
				<div className="form-group form-gap15">
					<div ref={errDiv} className="error-list">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</div>
					<div className="form-input-ctrl tooltip">
						<i className="fa-solid fa-user"></i>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							placeholder="Username"
							className="input"
						/>
						<span ref={usernameEl} className="tooltiptext hidden">
							{usernameErr}
						</span>
					</div>
					<div className="form-input-ctrl">
						<i className="fa-solid fa-at"></i>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="email"
							className="input"
						/>
					</div>
					<div className="form-input-ctrl  tooltip">
						<i className="fa-solid fa-lock"></i>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Password"
							className="input"
						/>
						<span ref={passwordEl} className="tooltiptext hidden">
							{passwordErr}
						</span>
					</div>
					<div className="form-input-ctrl tooltip">
						<i className="fa-solid fa-key"></i>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							placeholder="confirmPassword"
							className="input"
						/>
						<span ref={confirmPasswordEl} className="tooltiptext hidden">
							{confirmPasswordErr}
						</span>
					</div>
					<button className="btn" type="submit" disabled={disable}>
						Sign Up
					</button>
					<div className="form-group form-gap15">
						<div className="form-link" onClick={demoLogin}>
							Login as Demo User
						</div>
						<div className="form-group">
							<div className="form-link-label">Already have an account?</div>
							<Link to="/login" className="form-link">
								Login
							</Link>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default SignupFormPage;
