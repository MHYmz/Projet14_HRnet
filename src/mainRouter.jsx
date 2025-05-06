import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NewEmployeeForm from "./pages/NewEmployeeForm/NewEmployeeForm"

function MainRouter() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<NewEmployeeForm />} />
      </Routes>
    </Router>
  )
}

export default MainRouter
