import { csrfFetch } from "./csrf";

// Actions
const GET_ALL_TRASH = "trash/GET_ALL_TRASH";
const PUT_BACK = "trash/PUT_BACK";
const EMPTY_TRASH = "trash/EMPTY_TRASH";

// Action Creators
const getTrash = (trash) => {
	return {
		type: GET_ALL_TRASH,
		trash,
	};
};

export const putBack = (noteId) => {
	return {
		type: PUT_BACK,
		noteId,
	};
};

export const emptyTrash = () => {
	return {
		type: EMPTY_TRASH,
	};
};

// Thunks
export const getAllTrash = (userId) => async (dispatch) => {
	const response = await csrfFetch("/api/trash");
	const data = await response.json();
	dispatch(getTrash(data));
	return response;
};

export const emptyAllTrash = () => async (dispatch) => {
	const response = await csrfFetch("/api/trash", {
		method: "DELETE",
	});
	const data = await response.json();
	if (data.message === "success") {
		dispatch(emptyTrash());
	}
	return response;
};

// Reducer
const initialState = { trash: null };

const trashReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ALL_TRASH:
			newState = {};
			action.trash.forEach((el) => {
				newState[el.id] = el;
			});
			return newState;
		case PUT_BACK:
			newState = { ...state };
			delete newState[action.noteId];
			return newState;
		case EMPTY_TRASH:
			return {};
		default:
			return state;
	}
};

export default trashReducer;
