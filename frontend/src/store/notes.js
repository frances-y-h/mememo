import { csrfFetch } from "./csrf";

// Action
const GET_ALL_NOTES = "notes/GET_ALL_NOTES";
const ADD_UPDATE_NOTE = "notes/ADD_UPDATE_NOTE";

// Action creator
const getNotes = (notes) => {
	return {
		type: GET_ALL_NOTES,
		notes,
	};
};

const addUpdateNote = (note) => {
	return {
		type: ADD_UPDATE_NOTE,
		note,
	};
};

// Thunks
export const getAllNotes = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/${userId}/notes`);
	const data = await response.json();
	dispatch(getNotes(data));
	return response;
};

export const editNote = (noteId, note) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteId}`, {
		method: "PUT",
		body: JSON.stringify(note),
	});
	const data = await response.json();
	dispatch(addUpdateNote(data));
	console.log(data);
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
		case ADD_UPDATE_NOTE:
			newState = { ...state };
			newState[action.note.id] = action.note;
			return newState;
		default:
			return state;
	}
};

export default noteReducer;
