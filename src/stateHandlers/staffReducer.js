import { REGISTER_EMPLOYEE } from "../interactions/staffActions";

const initialState = {
  staffList: [],
};

export default function staffRegistryReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_EMPLOYEE:
      return {
        ...state,
        staffList: [...state.staffList, action.payload],
      };
    default:
      return state;
  }
}
