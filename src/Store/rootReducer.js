import { combineReducers } from "redux";
import staffRegistryReducer from "./staffReducer";

const rootReducer = combineReducers({
  staffData: staffRegistryReducer,
});

export default rootReducer;
