import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NewEmployeeForm from "./pages/NewEmployeeForm/NewEmployeeForm"
import EmployeeDirectory from "./pages/EmployeeDirectory/EmployeeDirectory"

function MainRouter() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<NewEmployeeForm />} />
      <Route path="/employees" element={<EmployeeDirectory/>}/>
      </Routes>
    </Router>
  )
}

export default MainRouter
