import { csrfFetch } from "./csrf";

// Actions
const GET_ALL_TAGS = "tags/GET_ALL_TAGS";
const ADD_NEW_TAG = "tags/ADD_NEW_TAG";

// Action Creators
const getTags = (tags) => {
	return {
		type: GET_ALL_TAGS,
		tags,
	};
};

const addTag = (tag) => {
	return {
		type: ADD_NEW_TAG,
		tag,
	};
};

// Thunks
export const getAllTags = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/${userId}/tags`);
	const data = await response.json();
	dispatch(getTags(data));
	return response;
};

export const addNewTag = (userId, tag) => async (dispatch) => {
	const response = await csrfFetch(`/api/${userId}/tags`, {
		method: "POST",
		body: JSON.stringify(tag),
	});
	const data = await response.json();
	dispatch(addTag(data));
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
		case ADD_NEW_TAG:
			newState = { ...state };
			newState[action.tag.id] = action.tag;
			return newState;
		default:
			return state;
	}
};

export default tagReducer;
