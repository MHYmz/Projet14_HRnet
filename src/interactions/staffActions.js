export const REGISTER_EMPLOYEE = "REGISTER_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";


export const registerEmployeeAction = (employeeInfo) => (dispatch) => {
  dispatch({
    type: REGISTER_EMPLOYEE,
    payload: employeeInfo,
  });
};

export const deleteEmployeeAction = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const updateEmployeeAction = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});
