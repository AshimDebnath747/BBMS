import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
function AddDonation(){
    const [user , setUser] = useState({Id:"",amount:"",date:"",place:""})
    const [error , setError] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{ 
            if(JSON.parse(localStorage.getItem("user")).role!="admin"){
                navigate("/login");
            }
            console.log("I am in the add donation page!")
        },[navigate]);
    function handleChange(e){
      setUser({...user,[e.target.name] : e.target.value})
    }
    async function handleDonation(e){
         e.preventDefault();
         const res = await fetch("/api/admin/donate/user",{
                 method:"POST",
                 headers:{
                  "Content-Type":"application/json"
              },
              body : JSON.stringify(user)
          });
          const data = await res.json();
          console.log(data);
          if(!data.success){
            setError(data.message);
          }
    }
   return( 
      <div className="flex justify-center items-center h-screen bg-gray-200  dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-16 rounded shadow-2xl w-1/3">
          <h2 className="text-3xl font-bold dark:text-white mb-10 text-gray-800">Add Donation</h2>
          <form action="">
              <div className="mb-6 " >
                  <label htmlFor="id" className="block text-gray-800 dark:text-white font-semibold">Enter ID</label>
                  <input name="Id" value={user.Id} className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white"onChange={handleChange} />
              </div>
              <div className="mb-6">
                  <label htmlFor="amount" className="block text-gray-800 dark:text-white font-semibold">Enter Amount</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white" name="amount" value={user.amount} onChange={handleChange}/>
              </div>
              <div className="mb-6">
                  <label htmlFor="date" className="block text-gray-800 dark:text-white font-semibold">Enter Date</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white" name="date" value={user.date} onChange={handleChange}/>
              </div>
              <div className="mb-6">
                  <label htmlFor="place" className="block text-gray-800 dark:text-white font-semibold">Enter the place</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white" name="place" value={user.place} onChange={handleChange}/>
              </div>
              <button className="w-full bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded" type="submit" onClick={handleDonation}>Add</button>
          </form>
          {error &&<div className='text-red-500 text-center mt-4'>{error}</div>}
      </div>
  </div>
   )
}
export default AddDonation;