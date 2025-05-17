import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { registerEmployeeAction } from "../../interactions/staffActions";
import CalendarSelector from "hrnet-calendar-selector";
import OptionSelector from "hrnet-option-selector"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import { regionList, divisionOptions} from "../../data/values"
import "./NewEmployeeCustom.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Header from "../../components/Header/Header"



export default function CreateEmployee() {
  const dispatch = useDispatch();

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
    toast.error("Please fill all fields");
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
  toast.success("Employee Created Successfully!");
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
        <CalendarSelector
          selectedDay={formData.dateOfBirth}
          onSelectDay={(date) => handleDateChange("dateOfBirth",date )}
          todayButton={<FontAwesomeIcon icon={faHome} />}
        />

        <label>Start Date:</label>
        <CalendarSelector
          selectedDay={formData.startDate}
          onSelectDay={(date) => handleDateChange("startDate", date)}
          todayButton={<FontAwesomeIcon icon={faHome} />}
        />
        </fieldset>
        </div>


        <div className="form-section">

        <fieldset>
          <legend>ADRESS</legend>
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
        
          <label>Zip Code:</label>
          <input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </fieldset>

        <label>Department:</label>
        <OptionSelector
          optionsList={divisionOptions}
          selectedValue={formData.division}
          onChange={(value) => 
            setFormData((prev) => ({ ...prev, division:value}))
          }
          />
          </div>
          </div>

        <div className="button-container">
        <button type="submit" className="save-button">Save</button>
        <button type="button" onClick={resetForm} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
    <ToastContainer/>
    </div>
  );
}