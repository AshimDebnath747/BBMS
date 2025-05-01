import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
function CreateBloodBank(){
    const [bank , setBank] = useState({name:"",address:""})
    const [error , setError] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{ 
            if(JSON.parse(localStorage.getItem("user")).role!="admin"){
                navigate("/login");
            }
            console.log("I am in the add blood bank page!")
        },[navigate]);
    function handleChange(e){
      setBank({...bank,[e.target.name] : e.target.value})
    }
    async function handleCreation(e){
         e.preventDefault();
         const res = await fetch("/api/admin/bloodbank/create",{
                 method:"POST",
                 headers:{
                  "Content-Type":"application/json"
              },
              body : JSON.stringify(bank)
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
          <h2 className="text-3xl font-bold dark:text-white mb-10 text-gray-800">Create Blood Bank!</h2>
          <form action="">
              <div className="mb-6 " >
                  <label htmlFor="id" className="block text-gray-800 dark:text-white font-semibold">Name</label>
                  <input name="Id" value={bank.name} className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white"onChange={handleChange} />
              </div>
              <div className="mb-6">
                  <label htmlFor="amount" className="block text-gray-800 dark:text-white font-semibold">Address</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white" name="amount" value={bank.address} onChange={handleChange}/>
              </div>
              <button className="w-full bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded" type="submit" onClick={handleCreation}>Add</button>
          </form>
          {error &&<div className='text-red-500 text-center mt-4'>{error}</div>}
      </div>
  </div>
   )
}
export default CreateBloodBank;