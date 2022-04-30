import { csrfFetch } from "./csrf";

const GET_ALL_NOTEBOOKS = "notebooks/GET_ALL_NOTEBOOKS";

// Action
const getNotebooks = (notebooks) => {
	return {
		type: GET_ALL_NOTEBOOKS,
		notebooks,
	};
};

// Thunks
export const getAllNotebooks = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/${userId}/notebooks`);
	const data = await response.json();
	// Get an array of notebooks from backend
	dispatch(getNotebooks(data));
	return response;
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
		default:
			return state;
	}
};

export default notebookReducer;
