import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NewEmployeeForm from "./pages/NewEmployeeForm/NewEmployeeForm"
import EmployeeDirectory from "./pages/EmployeeDirectory/EmployeeDirectory"
import ErrorPage from "./pages/ErrorPage/ErrorPage"

function MainRouter() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<NewEmployeeForm />} />
      <Route path="/employees" element={<EmployeeDirectory/>}/>
      <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </Router>
  )
}

export default MainRouter
