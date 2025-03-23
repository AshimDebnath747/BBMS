import { useNavigate } from "react-router";
import { useState,useEffect } from "react";
function AdminHome(){
    const navigate = useNavigate();
    const [admin , setAdmin] = useState([]);
    useEffect(()=>{ 
        setAdmin(JSON.parse(localStorage.getItem("user")));
        if(JSON.parse(localStorage.getItem("user")).role!="admin"){
            navigate("/login");
        }
    },[navigate,setAdmin]);
    console.log(admin);
    function handleDonateClick(){
        navigate("/admin/donate");
    }
    return(
        <div className="dark:bg-gray-900 h-screen flex flex-col justify-center items-center">
             <div className="dark:bg-gray-800 flex flex-col justify-center items-center p-4 rounded-2xl">
            <h3 className="text-white font-bold inline">Hello Admin <div className="text-pink-500 inline">{admin.name}</div></h3>
            <div className="bg-indigo-500 font-bold text-white p-4 rounded m-2">Total Donations This Month : {admin.donations} ltr.</div>
            <button className="bg-pink-500 text-white p-2 rounded-xl font-bold" onClick={()=> handleDonateClick()}>Add donation</button>
            <button className="bg-pink-500 text-white p-2 rounded-xl mt-3 font-bold">Blood Requests</button>
            </div>
        </div>
    )
}
export default AdminHome;