// Dependencies
import Login from "./pages/login";
import NavBar from "./components/navbar";
import { Routes,Route } from "react-router";
import SignUp from "./pages/signup";
import DonorSignUp from "./pages/donorSignup";
import AddDonation from "./pages/addDonation";
import Home from "./pages/home";
import History from './pages/History'
import AdminHome from "./pages/adminHome";
import PatientSignup from "./pages/patientSignup";
import CreateBloodBank from "./pages/addBloodBank";
import PatientHome from "./pages/patientHome";
import SearchBlood from "./pages/searchBlood";
function App() {

  return (
    <>
    <Routes>
    <Route path="/" Component={Home}/>
    <Route path="/donor/home" Component={Home}/>
    <Route path="/admin/home" Component={AdminHome}/>
    <Route path='patient/home' Component={PatientHome}/>
    <Route path="/login" Component={Login} />
    <Route path="/signup" Component={SignUp} />
    <Route path="/donor/signup" Component={DonorSignUp} />
    <Route path="/patient/signup" Component={PatientSignup}/>
    <Route path="/donor/history" Component={History} />
    <Route path="/admin/donate" Component={AddDonation} />
    <Route path="/admin/bloodbank/create" Component={CreateBloodBank}/>
    <Route path="/patient/search" Component={SearchBlood}/>
    </Routes> 
     
    </>
  )
}

export default App
