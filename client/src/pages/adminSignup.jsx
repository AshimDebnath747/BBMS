import { useState } from "react";
import { userStore } from "../store/user.js";
import { useNavigate } from "react-router";
function AdminSignUp(){
    const navigate = useNavigate();
    const {createUser} = userStore();
    const [user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        role:"admin",
    });
    function handleChange(e){
        setUser({...user,[e.target.name]:e.target.value})
    }
    async function handleCreateUser(e){
       e.preventDefault();
       const res = await createUser(user);
       console.log(res)
       if(res.success == true){
        navigate("/login")
       }
    }
    return(
        <div className="flex justify-center items-center h-screen bg-gray-200  dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-16 rounded shadow-2xl w-1/3">
                <h2 className="text-3xl font-bold dark:text-white mb-10 text-gray-800">Sign Up</h2>
                <form onSubmit={handleCreateUser}>
                    <div className="grid grid-cols-2 gap-6">
                    <div className="mb-6 " >
                        <label htmlFor="name" className="block text-gray-800 dark:text-white font-semibold">Name</label>
                        <input type="text" name="name" value={user.name} className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white"onChange={handleChange} />
                    </div>
                    <div className="mb-6 " >
                        <label htmlFor="email" className="block text-gray-800 dark:text-white font-semibold">Email</label>
                        <input type="email" name="email" value={user.email} className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white"onChange={handleChange} />
                    </div>
                    <div className="mb-6 " >
                        <label htmlFor="phone" className="block text-gray-800 dark:text-white font-semibold">Phone number</label>
                        <input type="text" name="phone" value={user.phone} className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white"onChange={handleChange} />
                    </div>
                    <div className="mb-6 " >
                        <label htmlFor="password" className="block text-gray-800 dark:text-white font-semibold">Password</label>
                        <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white" name="password" value={user.password} onChange={handleChange}/>
                    </div>
                    </div>
                    <button className="w-full bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded" type="submit">create Donor Account</button>
                </form>
            </div>

        </div>
    )
}

export default AdminSignUp;