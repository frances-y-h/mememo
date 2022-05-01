import { csrfFetch } from "./csrf";

// Actions
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// Scratch pad
const UPDATE_PAD = "scratchPad/UPDATE_PAD";

// Action Creators
const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

// Scratch pad
const updatePad = (pad) => {
	return {
		type: UPDATE_PAD,
		pad,
	};
};

// Thunks
export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { username, email, password } = user;
	const response = await csrfFetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch("/api/session");
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const logoutUser = () => async (dispatch) => {
	const response = await csrfFetch("/api/session", {
		method: "DELETE",
	});
	dispatch(removeUser());
	return response;
};

// ScratchPad Thunks
export const updateScratchPad = (userId, pad) => async (dispatch) => {
	const body = JSON.stringify(pad);
	const response = await csrfFetch(`/api/${userId}/scratchpad`, {
		method: "PUT",
		body,
	});

	const data = await response.json();
	dispatch(updatePad(data));
	return data;
};

// Reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state);
			newState.user = action.payload;
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		case UPDATE_PAD:
			newState = { ...state };
			newState.user.scratchPad = action.pad;
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
