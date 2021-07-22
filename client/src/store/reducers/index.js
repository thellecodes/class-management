import { combineReducers } from "redux";
import classReducer from "./classReducer";
import courseReducer from "./courseReducer";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";

export default combineReducers({
  cla: classReducer,
  cou: courseReducer,
  stu: studentReducer,
  error: errorReducer,
});
