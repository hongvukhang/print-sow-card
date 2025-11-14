import { createStore, combineReducers } from "redux";
import { printReducer } from "./printReducer";
const rootReducer = combineReducers({
  data: printReducer,
});

export const store = createStore(rootReducer);
