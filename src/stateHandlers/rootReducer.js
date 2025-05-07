import { combineReducers } from "redux";
import staffRegistryReducer from "./staffReducer";

export default combineReducers({
  staffData: staffRegistryReducer,
});
