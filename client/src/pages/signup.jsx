import { Link } from "react-router";
function SignUp(){

    return(
        <div className="flex justify-center items-center h-screen bg-gray-200  dark:bg-gray-900">
        <div className="">
       <button className="mr-6 bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded">
        <Link to={"/donor/signup"}>Donor SignUp</Link>
        </button>
        <button className="mr-6 bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded">
        <Link to={"/patient/signup"}>Patient SignUp</Link>
        </button>
        <button className="bg-pink-500 hover:bg-pink-400 text-white font-semibold p-3 rounded">
        <Link to={"/admin/signup"}>Admin SignUp</Link>
        </button>
        </div>
        </div>
    )
}
export default SignUp;