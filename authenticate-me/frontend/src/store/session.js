import { csrfFetch } from "./csrf";

// Actions
const LOGIN = "session/LOGIN";
const LOGOUT = "session/LOGOUT";

const initialState = { user: null };

// Reducer
export default function sessionReducer(state = initialState, action) {
	Object.freeze(state);

	let newState;

	switch (action.type) {
		case LOGIN:
			newState = { ...state };
			newState.user = action.user;
			return newState;
		case LOGOUT:
			newState = { ...state };
			newState.user = null;
			return newState;
		default:
			return state;
	}
}

//Action Creators
export function login(user) {
	return {
		type: LOGIN,
		user,
	};
}

export function logout() {
	return {
		type: LOGOUT,
	};
}

// Thunks
// Payload must be in {"credential": "xxx", "password": "xxx"} format
export const loginUser = (payload) => async (dispatch) => {
	const response = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify(payload),
	});

	const data = await response.json();
	dispatch(login(data.user));
	return response;
};

export const logoutUser = () => async (dispatch) => {
	const response = await csrfFetch("/api/session", {
		method: "DELETE",
	});

	if (response.ok) {
		const message = await response.json().message;
		dispatch(logout());
		return message;
	}
};
