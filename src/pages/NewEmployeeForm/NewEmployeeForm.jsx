import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { registerEmployeeAction } from "../../interactions/staffActions";
import { regionList, divisionOptions} from "../../data/values"
import "./NewEmployeeCustom.css"
import Header from "../../components/Header/Header"
import Modal from "../../components/Modal/Modal"

const CalendarSelector = lazy (() => import("../../components/CalendarSelector/CalendarSelector"));
const OptionSelector = lazy (() => import ("hrnet-option-selector"));


export default function CreateEmployee() {
  const dispatch = useDispatch();

const [toast, setToast] = useState({ show: false, message: "", type: "success" });

const [employees, setEmployees] = useState(() => {
  const storedEmployees = localStorage.getItem("employees");
  return storedEmployees ? JSON.parse(storedEmployees) : [];
});


  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  startDate: null,
  street: "",
  city:"",
  zipCode:"",
  region:"",
  division:"",
});

useEffect(() => {
  localStorage.setItem("employees", JSON.stringify(employees));
}, [employees]);

const handleChange = useCallback ((e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value}));
}, []);  
  
const handleDateChange = useCallback ((name, date) => {
  setFormData((prev) => ({ ...prev, [name]: date }));
}, []);

const resetForm = useCallback (() => {
  setFormData({
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  startDate: null,
  street: "",
  city:"",
  zipCode:"",
  region:"",
  division:"",
  });
}, []);

const registerEmployee = useCallback(
  (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value )) {
      setToast({ show: true, message: "Please fill all fields",type:"error"});
    return;
  }

  const newEmployee = {
    ...formData,
    id: Date.now(),
    dateOfBirth: formData.dateOfBirth.toISOString(),
    startDate: formData.startDate.toISOString(),
    address: {
      street: formData.street,
      city: formData.city,
      state: formData.region,
      zipCode: formData.zipCode,
    },
    department: formData.division,
  };


const updatedEmployees = [...employees, newEmployee];
setEmployees(updatedEmployees);

  dispatch(registerEmployeeAction(newEmployee));
  setToast({ show: true, message: "Employee Created Successfully!", type:"success"});
  resetForm();
},
[dispatch, formData, resetForm, employees]
);

  return (
    <div>
      <Header />

    <div className="container">
      <h2>Create Employee</h2>
      <Link to="/employees" className="see-active-employees">
      See Active Employees</Link>

      <form onSubmit={registerEmployee} className="form-container">
        <div className="form-sections">
        <div className="form-section">
          <fieldset>
            <legend>PERSONAL INFORMATION</legend>
        <label>First Name:</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Last Name:</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>Date of Birth:</label>
        <Suspense fallback={<div>Loading calendar...</div>}>
        <CalendarSelector
          selectedDay={formData.dateOfBirth}
          onSelectDay={(date) => handleDateChange("dateOfBirth",date )}
          todayButton='Today'
        />
        </Suspense>

        <label>Start Date:</label>
        <Suspense fallback={<div>Loading calendar...</div>}>
        <CalendarSelector
          selectedDay={formData.startDate}
          onSelectDay={(date) => handleDateChange("startDate", date)}
          todayButton='Today'
        />
        </Suspense>
        </fieldset>
        </div>


        <div className="form-section">

        <fieldset>
          <legend>ADDRESS</legend>
          <label>Street:</label>
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
          />

          <label>City:</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <label>State:</label>
          <Suspense fallback={<div>Loading selector...</div>}>
          <OptionSelector 
              optionsList={regionList.map((s) => ({
                value: s.abbreviation,
                label: s.name,
              }))}
              selectedValue={formData.region}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, region:value}))
              }
            />
            </Suspense>
        
          <label>Zip Code:</label>
          <input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </fieldset>

        <label>Department:</label>
        <Suspense fallback={<div>Loading selector...</div>}>
        <OptionSelector
          optionsList={divisionOptions}
          selectedValue={formData.division}
          onChange={(value) => 
            setFormData((prev) => ({ ...prev, division:value}))
          }
          />
          </Suspense>
          </div>
          </div>

        <div className="button-container">
        <button type="submit" className="save-button">Save</button>
        <button type="button" onClick={resetForm} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
    {toast.show && (
      <Modal
        isOpen={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        >
        <div className={`modal-message ${toast.type}`}>
            {toast.message}
        </div>
        </Modal>
      )}
    </div>
  );
}