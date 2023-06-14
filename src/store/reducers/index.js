import { postReducer } from "./postReducer";
import { categoryReducer } from "./categoryReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  post: postReducer,
  category: categoryReducer,
});
