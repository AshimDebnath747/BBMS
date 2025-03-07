import { useEffect } from "react";
import {useState} from "react";
import { useNavigate,Link} from "react-router";

function Home(){
    const navigate= useNavigate();
    const [donor , setDonor] = useState([]);
    useEffect(()=>{
        if(!localStorage.getItem("user")){
            navigate("/Login");
        }
        setDonor(JSON.parse(localStorage.getItem("user")));
    },[navigate,setDonor])
    function checkEligibility(){
        let date = new Date(donor.lastDonated);
        let current = new Date().getMonth()+1;
        const getMonth = date.getMonth()+1;
        const temp = current - getMonth
        if(temp>=3){
            return `eligible`;
        }else{
            return 'not eligible';
        }
    }
    function extractMonthYear(){
        let date = new Date(donor.lastDonated);
        const getMonth = date.getMonth()+1;
        const getYear = date.getFullYear();
        const getDay = date.getDate();
        return `${getDay}/${getMonth}/${getYear}`;
    }
    return(
        <div className="flex flex-col items-center justify-top dark:bg-gray-900 h-screen">
            <div className="content-center shadow-xl mt-7 text-3xl box-border p-4 text-center dark:text-white dark:bg-gray-800 rounded"><p>Welcome {donor.name}!</p>
            <p>Blood Type : {donor.bloodGroup}</p>
        <div className="content-center shadow-xl mt-4 text-3xl box-border w-lg p-4 text-center dark:text-white dark:bg-blue-500 rounded ">
            <h3>DashBoard</h3>
            <p>Total donted : {donor.totalBlood} ltr.</p>
            <p className="text-2xl">Last donated : {extractMonthYear()}</p>
        </div>
        <div className="content-center shadow-xl mt-4 text-3xl box-border w-lg p-4 text-center dark:text-white dark:bg-green-500  rounded ">
            <h3>Donation status</h3>
            <p>You are currently {checkEligibility()} to donate.
            </p>
        </div>
        <button className="dark:bg-red-500 rounded text-gray-200 h-12 p-1 mt-2 font-bold cursor-pointer">Schedule donation</button>
        <button className="dark:bg-red-500 ml-2 p-1 rounded text-gray-200 h-12 mt-2 font-bold cursor-pointer" ><Link to="/donor/history">Donation history</Link></button>
        </div>
        </div>
    )
}

export default Home;