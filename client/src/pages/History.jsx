
import { useEffect } from "react";
import { useState } from "react";
function History(){
    const [history , setHistory] = useState([]);
    async function fetchHistory(){
      const id = JSON.parse(localStorage.getItem("user")).id;
      const res = await fetch(`/api/donor/history/${id}`,{
        method:"GET"
      });
      const data = await res.json();
      if(!data){
        console.log("no history found!");
      }
      setHistory(data.data);
    }
    function formatTime(date){
        const data = new Date(date);
        if(!date){
            return `NA`;
        }
       const getDate = data.getDate();
       const getMonth = data.getMonth()+1;
       const getYear = data.getFullYear();
       return `${getDate}/${getMonth}/${getYear}`;
    }
    useEffect(()=>{
        fetchHistory();
    },[setHistory])
    const MapHistory = history.map(h => <div key={h.id} className="bg-pink-500 mt-6 rounded flex flex-col items-center justify-center p-4 text-xl font-light" >
        <div>Place : {h.place}</div>
        <div>Amount :{h.amount}</div>
        <div>Date :{formatTime(h.date)}</div>
       </div>)
    return(
        <div className="flex flex-col bg-gray-900 min-h-screen justify-center items-center">
            <div className="bg-gray-800 p-5 mt-6 rounded text-white w-100">
            <h3 className="font-bold text-xl text-center">Donation History</h3>
            {MapHistory}
            </div>
            
        </div>
    )
}
export default History;