export const REGISTER_EMPLOYEE = "REGISTER_EMPLOYEE";

export const registerEmployeeAction = (employeeInfo) => (dispatch) => {
  dispatch({
    type: REGISTER_EMPLOYEE,
    payload: employeeInfo,
  });
};
