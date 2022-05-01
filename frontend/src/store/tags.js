import { csrfFetch } from "./csrf";

// Actions
const GET_ALL_TAGS = "tags/GET_ALL_TAGS";
const ADD_UPDATE_TAG = "tags/ADD_UPDATE_TAG";
const DELETE_TAG = "tags/DELETE_TAG";

// Action Creators
const getTags = (tags) => {
	return {
		type: GET_ALL_TAGS,
		tags,
	};
};

const addUpdateTag = (tag) => {
	return {
		type: ADD_UPDATE_TAG,
		tag, // with tag id
	};
};

const deleteTag = (tagId) => {
	return {
		type: DELETE_TAG,
		tagId,
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
	dispatch(addUpdateTag(data));
	return response;
};

export const updateTag = (tagId, tag) => async (dispatch) => {
	const response = await csrfFetch(`/api/tags/${tagId}`, {
		method: "PUT",
		body: JSON.stringify(tag), // without tag id
	});
	const data = await response.json();
	dispatch(addUpdateTag(data)); // with tag ID
	return response;
};

export const deleteOldTag = (tagId) => async (dispatch) => {
	const response = await csrfFetch(`/api/tags/${tagId}`, {
		method: "DELETE",
	});
	const data = await response.json(); // tag id in object
	console.log(typeof data);
	dispatch(deleteTag(data));
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
		case ADD_UPDATE_TAG:
			newState = { ...state };
			newState[action.tag.id] = action.tag;
			return newState;
		case DELETE_TAG:
			newState = { ...state };
			delete newState[action.tagId];
			return newState;
		default:
			return state;
	}
};

export default tagReducer;
