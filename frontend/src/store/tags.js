import { csrfFetch } from "./csrf";

// Actions
const GET_ALL_TAGS = "tags/getAllTags"

// Action Creators
const getTags = (tags) => {
  return {
    type: GET_ALL_TAGS,
    tags,
  }
};


// Thunks
export const getAllTags = (userId) => async(dispatch) => {
  const response = await csrfFetch(`/api/${userId}/tags`);
  const data = await response.json();
  dispatch(getTags(data));
  return response;
}

// Reducer
const initialState = { tags: null};

const tagReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    case GET_ALL_TAGS:
      newState = {...state, tags: action.tags};
      return newState;
    default:
      return state;
  }
};

export default tagReducer;
