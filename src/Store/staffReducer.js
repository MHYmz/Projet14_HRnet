import { REGISTER_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE} from "../interactions/staffActions";

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
      case DELETE_EMPLOYEE:
      return {
        ...state,
        staffList: state.staffList.filter((emp) => emp.id !== action.payload),
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        staffList: state.staffList.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    default:
      return state;
  }
}
