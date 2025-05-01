import { useEffect } from "react";
import {useState} from "react";
import { useNavigate,Link} from "react-router";
import NavBar from "../components/navbar";
function PatientHome(){
    const navigate= useNavigate();
    const [patient , setPatient] = useState([]);
    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("user"))){
            navigate("/login");
        }
        setPatient(JSON.parse(localStorage.getItem("user")));
    },[navigate,setPatient])
    return(
        <div className="flex flex-col items-center justify-top dark:bg-gray-900 h-screen">
            <NavBar></NavBar>
            <div className="content-center shadow-xl mt-7 text-3xl box-border p-4 text-center dark:text-white dark:bg-gray-800 rounded"><p>Welcome patient {patient.name}!</p>
            <p>Blood Type : {patient.bloodGroup}</p>
            <p>Your id is : {patient.id}</p>
        </div>
        </div>
    )
}

export default PatientHome;