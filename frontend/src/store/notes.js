import { csrfFetch } from "./csrf";

// Action
const GET_ALL_NOTES = "notes/GET_ALL_NOTES";

// Action creator
const getNotes = (notes) => {
	return {
		type: GET_ALL_NOTES,
		notes,
	};
};

// Thunks
export const getAllNotes = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/${userId}/notes`);
	const data = await response.json();
	dispatch(getNotes(data));
	return response;
};

// Reducer
const initialState = { notes: null };

const noteReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ALL_NOTES:
			newState = {};
			action.notes.forEach((note) => {
				newState[note.id] = note;
			});
			return newState;
		default:
			return state;
	}
};

export default noteReducer;
