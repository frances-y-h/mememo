import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from "./session";
import notebookReducer from "./notebooks";
import noteReducer from "./notes";
import tagReducer from "./tags";
import trashReducer from "./trash";

const rootReducer = combineReducers({
	session: sessionReducer,
  notebooks: notebookReducer,
  notes: noteReducer,
  tags: tagReducer,
  trash: trashReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
