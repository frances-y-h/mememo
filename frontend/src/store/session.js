import { csrfFetch } from "./csrf";

// Actions
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// Scratch pad
const UPDATE_PAD = "scratchPad/UPDATE_PAD";

// Favorite
const ADD_FAVORITE = "/favorite/ADD_FAVORITE";
const REMOVE_FAVORITE = "/favorite/REMOVE_FAVORITE";
const UPDATE_FAVORITES = "/favorite/UPDATE_FAVORITES";

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

// Favorite
export const addFavorite = (noteId) => {
	return {
		type: ADD_FAVORITE,
		noteId,
	};
};

export const removeFavorite = (noteId) => {
	return {
		type: REMOVE_FAVORITE,
		noteId,
	};
};

const updateFavorites = (favorite) => {
	return {
		type: UPDATE_FAVORITES,
		favorite, // favorites array
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
export const updateScratchPad = (pad) => async (dispatch) => {
	const body = JSON.stringify(pad);
	const response = await csrfFetch(`/api/scratchpad`, {
		method: "PUT",
		body,
	});

	const data = await response.json();
	dispatch(updatePad(data));
	return data;
};

// Favorite Thunks
export const addToFavorite = (noteId) => async (dispatch) => {
	const response = await csrfFetch(`/api/favorite/${noteId}`, {
		method: "POST",
	});
	const data = await response.json();
	dispatch(addFavorite(data));
	return data;
};

export const updateFavoritesArr = (favorite) => async (dispatch) => {
	const body = JSON.stringify({ favorite }); // put array into object
	const response = await csrfFetch("/api/favorite", {
		method: "PUT",
		body,
	});
	const data = await response.json();
	dispatch(updateFavorites(data)); // dispatch array
	return data;
};

export const removeFromFavorite = (noteId) => async (dispatch) => {
	const response = await csrfFetch(`/api/favorite/${noteId}`, {
		method: "DELETE",
	});
	const data = await response.json();
	dispatch(removeFavorite(data));
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
		case UPDATE_FAVORITES:
			newState = { ...state };
			newState.user.favorite = [...action.favorite];
			return newState;
		case ADD_FAVORITE:
			newState = { ...state };
			if (!newState.user.favorite.some((id) => id === action.noteId)) {
				newState.user.favorite = [...state.user.favorite, action.noteId];
			}
			return newState;
		case REMOVE_FAVORITE:
			newState = { ...state };
			newState.user.favorite = newState.user.favorite.filter(
				(id) => id !== action.noteId
			);
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
