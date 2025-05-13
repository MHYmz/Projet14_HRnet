import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { registerEmployeeAction } from "../../interactions/staffActions";
import CalendarSelector from "../../components/CalendarSelector/CalendarSelector";
import OptionSelector from "../../components/OptionSelector/OptionSelector"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import { regionList, divisionOptions} from "../../data/values"
import "./NewEmployeeCustom.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Header from "../../components/Header/Header"



export default function CreateEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [region, setRegion] = useState("");
  const [division, setDivision] = useState("");

  const dispatch = useDispatch();

const resetForm = () => {
  setFirstName("");
  setLastName("");
  setDateOfBirth(null);
  setStartDate(null);
  setStreet("");
  setCity("");
  setRegion("");
  setZipCode("");
  setDivision("");
}

const registerEmployee = (e) => {
  e.preventDefault();
  
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !dateOfBirth ||
    !startDate ||
    !street.trim() ||
    !city.trim() ||
    !region ||
    !zipCode.trim() ||
    !division
  ) {
    toast.error("Please fill all fields");
    return;
  }

  const newEmployee = {
    firstName,
    lastName,
    dateOfBirth: dateOfBirth.toISOString(),
    startDate: startDate.toISOString(),
    address: {
      street,
      city,
      state: region,
      zipCode,
    },
    department: division,
  };

  dispatch(registerEmployeeAction(newEmployee));

  toast.success("Employee Created Successfully!");
  resetForm();
};


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
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Date of Birth:</label>
        <CalendarSelector
          selectedDay={dateOfBirth}
          onSelectDay={setDateOfBirth}
          todayButton={<FontAwesomeIcon icon={faHome} />}
        />

        <label>Start Date:</label>
        <CalendarSelector
          selectedDay={startDate}
          onSelectDay={setStartDate}
          todayButton={<FontAwesomeIcon icon={faHome} />}
        />
        </fieldset>
        </div>


        <div className="form-section">

        <fieldset>
          <legend>ADRESS</legend>
          <label>Street:</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />

          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label>State:</label>
          <OptionSelector 
              optionsList={regionList.map((s) => ({
                value: s.abbreviation,
                label: s.name,
              }))}
              selectedValue={region}
              onChange={setRegion}
            />
        
          <label>Zip Code:</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </fieldset>

        <label>Department:</label>
        <OptionSelector
          optionsList={divisionOptions}
          selectedValue={division}
          onChange={(value) => setDivision(value)}
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