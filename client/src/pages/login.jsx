import {useState} from 'react';
import { userStore } from '../store/user.js';
import { useNavigate } from 'react-router';
function Login(){
const [user , setUser] = useState({email:"",password:"",role:""});
const [error,setError] = useState("");
const {loginUser} = userStore();
const Navigate = useNavigate();
function handleChange(e){
    setUser({...user,[e.target.name]:e.target.value})
}
async function handleLoginUser(e){
     e.preventDefault();
      const res = await loginUser(user);
      if(res.success===true){
        setError("");
        localStorage.setItem("token",res.token);
        localStorage.setItem("user",JSON.stringify(res[user.role]));
        Navigate(`/${user.role}/home`);
      }else{
           setError(res.message);
      }
}
    return(
        <div className="flex justify-center items-center h-screen bg-gray-200  dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-16 rounded shadow-2xl w-1/3">
                <h2 className="text-3xl font-bold dark:text-white mb-10 text-gray-800">Login</h2>
                <form action="">
                    <div className="mb-6 " >
                        <label htmlFor="email" className="block text-gray-800 dark:text-white font-semibold">Email Address</label>
                        <input type="email" name="email" value={user.email} className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white"onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-800 dark:text-white font-semibold">Password</label>
                        <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-white" name="password" value={user.password} onChange={handleChange}/>
                    </div>
                    <div className='mb-6 flex flex-row'>
                        <p className='font-bold mr-3 text-gray-800 dark:text-white'>Login as</p>
                        <input type="radio" name="role" value="donor" onChange={handleChange} className="mr-2" />
                        <label htmlFor="donor" className="mr-6 dark:text-white">Donor</label>
                        <input type="radio" name="role" value="patient" onChange={handleChange}  className="mr-2" />
                        <label htmlFor="patient" className="mr-6 dark:text-white">Patient</label> 
                        <input type="radio" name="role" value="admin" onChange={handleChange} className="mr-2  " />
                        <label htmlFor="Admin" className="mr-6 dark:text-white">Admin</label> 
                    </div>
                   <div className='mb-6'>
                          <p className="text-gray-800 dark:text-white">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
                   </div>
                    <button className="w-full bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded" type="submit" onClick={handleLoginUser}>Login</button>
                </form>
                {error &&<div className='text-red-500 text-center mt-4'>{error}</div>}
            </div>

        </div>
    )
}
export default Login;