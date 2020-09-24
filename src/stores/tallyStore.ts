import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { tallyReducer } from "../reducers/reducers";

export const tallyStore = createStore(
  tallyReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
