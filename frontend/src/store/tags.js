import { csrfFetch } from "./csrf";

// Actions
const GET_ALL_TAGS = "tags/GET_ALL_TAGS";

// Action Creators
const getTags = (tags) => {
	return {
		type: GET_ALL_TAGS,
		tags,
	};
};

// Thunks
export const getAllTags = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/${userId}/tags`);
	const data = await response.json();
	dispatch(getTags(data));
	return response;
};

// Reducer
const initialState = { tags: null };

const tagReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_ALL_TAGS:
			newState = {};
			action.tags.forEach((tag) => {
				newState[tag.id] = tag;
			});
			return newState;
		default:
			return state;
	}
};

export default tagReducer;
