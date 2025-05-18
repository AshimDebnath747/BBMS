import { useEffect , useState } from "react";
import {useNavigate} from "react-router";
import { CgSearch } from "react-icons/cg";
function SearchBlood(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("user"))){
            navigate("/login");
        }
    },[navigate])
     const [text , setText] = useState("");
     const [banks , setBanks] = useState([]);
     function handleChange(e){
        setText(e.target.value);
        console.log(text);
     }
     async function search(e){
        e.preventDefault();
        if(text.length===0){
            alert("Please enter a blood group");
            return;
        }
        const res = await fetch(`/api/patient/search/${text}`,{
            method:"GET"
        })
        const data = await res.json();
        //console.log(data.data);
        setBanks(data.data);
        console.log("data in state:" , banks);

     }
    

     const mapBanks = banks.map(b => <div key={b.id} className="bg-pink-500 mt-6 rounded flex flex-col items-center justify-center p-4 text-xl font-light" >
        <div>Blood Bank : {b.name}</div>
        <div>place : {b.address}</div>
        <div>available Blood : {b.availableBlood.map( bl => <div className="bg-red-500 flex flex-col items-center p-2 rounded mt-2" key={bl.bloodGroup}>
            <div>blood Group : {bl.bloodGroup}</div>
            <div>amount : {bl.amount} ltrs</div>
        </div> )}</div>
     </div>)
    return(
        <div className="flex flex-col items-center justify-top dark:bg-gray-900 h-screen text-white">
            <form action="" method="get" className="flex items-center justify-center">
                <input type="text" placeholder="Enter a blood group" name="search" value={text} onChange={handleChange} className="bg-gray-800 rounded mt-2 p-2 ring-0 focus:ring-0 shadow-none focus:shadow-none focus:outline-none border-none focus:border-none text-xl"/>
                <button className="bg-gray-800 p-2 mt-2 ml-2 rounded cursor-pointer hover:bg-gray-600" onClick={search}><CgSearch className="size-6"/></button>
            </form>
            <div>
                {mapBanks}
            </div>
        </div>
    )
}
export default SearchBlood;