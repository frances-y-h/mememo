import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import DesktopPage from "./components/DesktopPage";
import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		isLoaded && (
			<Switch>
				<Route path="/" exact>
					<SplashPage />
				</Route>
				<Route path="/login">
					<LoginFormPage />
				</Route>
				<Route path="/signup">
					<SignupFormPage />
				</Route>
				<Route path="/desktop">
					<DesktopPage />
				</Route>
			</Switch>
		)
	);
}

export default App;
