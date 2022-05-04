import { csrfFetch } from "./csrf";

const GET_ALL_NOTEBOOKS = "notebooks/GET_ALL_NOTEBOOKS";
const ADD_UPDATE_NOTEBOOK = "notebooks/ADD_UPDATE_NOTEBOOK";

// Action
const getNotebooks = (notebooks) => {
	return {
		type: GET_ALL_NOTEBOOKS,
		notebooks,
	};
};

const addUpdateNotebook = (notebook) => {
	return {
		type: ADD_UPDATE_NOTEBOOK,
		notebook,
	};
};

// Thunks
export const getAllNotebooks = () => async (dispatch) => {
	const response = await csrfFetch("/api/notebooks");
	const data = await response.json();
	// Get an array of notebooks from backend
	dispatch(getNotebooks(data));
	return response;
};

export const addNotebook = (notebook) => async (dispatch) => {
	const response = await csrfFetch("/api/notebooks/", {
		method: "POST",
		body: JSON.stringify(notebook),
	});

	const data = await response.json();
	dispatch(addUpdateNotebook(data));
	return data;
};

// Reducer

const initialState = { notebooks: null };

const notebookReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ALL_NOTEBOOKS:
			newState = {};
			action.notebooks.forEach((notebook) => {
				newState[notebook.id] = notebook;
			});
			return newState;
		case ADD_UPDATE_NOTEBOOK:
			newState = { ...state };
			newState[action.notebook.id] = action.notebook;
			return newState;
		default:
			return state;
	}
};

export default notebookReducer;
