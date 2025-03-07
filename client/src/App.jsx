// Dependencies
import Login from "./pages/login";
import NavBar from "./components/navbar";
import { Routes,Route } from "react-router";
import SignUp from "./pages/signup";
import DonorSignUp from "./pages/donorSignup";
import AdminSignUp from "./pages/adminSignup"
import Home from "./pages/home";
import History from './pages/History'
import AdminHome from "./pages/adminHome";
function App() {

  return (
    <>
    <Routes>
    <Route path="/donor/home" Component={Home}/>
    <Route path="/admin/home" Component={AdminHome}/>
    <Route path="/login" Component={Login} />
    <Route path="/signup" Component={SignUp} />
    <Route path="/donor/signup" Component={DonorSignUp} />
    <Route path="/donor/history" Component={History} />
    <Route path="/admin/signup" Component={AdminSignUp} />

    </Routes>
     
    </>
  )
}

export default App
