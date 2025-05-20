import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"

const NewEmployeeForm = lazy(() => import("./pages/NewEmployeeForm/NewEmployeeForm"));
const EmployeeDirectory = lazy(() => import("./pages/EmployeeDirectory/EmployeeDirectory"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

function MainRouter() {
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route path="/" element={<NewEmployeeForm />} />
      <Route path="/employees" element={<EmployeeDirectory/>}/>
      <Route path="*" element={<ErrorPage/>} />
      </Routes>
      </Suspense>
    </Router>
  )
}

export default MainRouter
