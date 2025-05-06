import { useState } from "react";
import CalendarSelector from "../../components/CalendarSelector/CalendarSelector";
import OptionSelector from "../../components/OptionSelector/OptionSelector"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import { regionList, divisionOptions} from "../../data/values"
import "./NewEmployeeCustom.css"



export default function CreateEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [region, setRegion] = useState("");
  const [division, setDivsion] = useState("");

  return (
    <div className="container">
      <h2>Create Employee</h2>
      <form>
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

        <fieldset>
          <legend>Address</legend>
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
                value: s.abreviation,
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
          optionList={divisionOptions}
          selectedValue={division}
          onChange={setDivsion}
          />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}