import React, { useState } from "react";
import "../styles/RideCreation.css"

export default function RideCreation() {

    const [start, setStart] = useState("")
    const [end,  setEnd] = useState("")

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(start, end)
    }
  return (
        
        <form className="form-group" >
            <div className = "ride-creation-header">
                <button className="ride-header-button">
                    <img className = "img" src='assets/steeringWheel.png'/>
                    Drive
                </button>  
                <button className="ride-header-button">
                    <img className = "img" src='assets/rideHailing.png'/>
                    Ride
                </button>
            </div>
            <div className="ride-creation-input">
                <h1>Enter your drive details</h1>
                <input type= "text" placeholder="Add a pick-up location" onChange={e => {setStart(e.target.value)}}/>
                <input type= "text" placeholder="Enter your destination" onChange={e => {setEnd(e.target.value)}}/>
                
            </div>
            <button onClick={handleSubmit}>Submit</button>

        </form>
        
    );
}