import { useEffect } from 'react';
import API from "../services/api";

function TestPage(){
    useEffect(()=>{
        //call backend when components load
        const fetchData=async()=>{
            try{
                const res=await API.get("/notes");
                console.log("Backend response:", res.data);
            } catch(err){
                console.error("Error fetching data from backend:",err.message);
            }
        };
        fetchData();
    },[]);

    return(
        <div>
            <h2>Testing backend connection...</h2>
            <p>check browser console</p>
        </div>
    );
}

export default TestPage;