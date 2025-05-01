//import {useState} from 'react';
import { useNavigate } from 'react-router';
function NavBar() {
  const navigate = useNavigate();
  function handleLogOut(){
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <nav className="navbar-expand-lg navbar-light bg-light dark:bg-gray-800 text-3xl p-4 mt-7 w-xl text-center">
     <button className="text-white bg-pink-500 p-4 cursor-pointer" onClick={()=> handleLogOut()}>logout</button>
    </nav>
  );
}
export default NavBar;