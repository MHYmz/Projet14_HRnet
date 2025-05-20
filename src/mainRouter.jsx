import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import Loader from "./components/Loader/Loader";

const NewEmployeeForm = lazy(() => import("./pages/NewEmployeeForm/NewEmployeeForm"));
const EmployeeDirectory = lazy(() => import("./pages/EmployeeDirectory/EmployeeDirectory"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

function MainRouter() {
  return (
    <Router>
        <Suspense fallback={<Loader/>}>
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
