import {useState} from "react";
//useState is a hook that allows react to keep track of the state of a component because react does not have track of normal updations in variables like email and password . react re-renders components when their state changes. so when we use useState hook and update the state using the state updator function (setEmail and setPassword in this case) react will re-render the component and reflect the changes in the UI.

function Login(){
    // state for form inputs
    const [email,setEmail]=useState(""); // when using useState use [currentstatevalue,stateUpdatorFunction] i.e. [email,setEmail] in this case
    const [password,setPassword]=useState("");

    //handle the form submit 
    const handleSubmit=(e)=>{
        e.preventDefault();//prevent page reload
        console.log("Email:",email);
        console.log("Password:",password);
    };

    return(
        <div style={{padding:"40px"}}>
            <h2>Login</h2>
        </div>
    )
}