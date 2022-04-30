import { csrfFetch } from "./csrf";

// Actions
const GET_ALL_TRASH = "trash/GET_ALL_TRASH";

// Action Creators
const getTrash = (trash) => {
	return {
		type: GET_ALL_TRASH,
		trash,
	};
};

// Thunks
export const getAllTrash = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/${userId}/trash`);
	const data = await response.json();
	dispatch(getTrash(data));
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
		default:
			return state;
	}
};

export default trashReducer;
