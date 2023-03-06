import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import "../styles/RideCreation.css"
import DateTimePicker from "react-datetime-picker";



const CreateRide = (props) =>{
    
    const [value, onChange] = useState(new Date())
    const [details, setDetails] = useState({
        start : "",
        end : "",
        time : new Date(),
        type : props.type,
        seats : ""
    })

    const text = ["Enter your drive details","Enter your ride details"]

    const handleSubmit = (event)=>{
        event.preventDefault();
        setDetails({...details, time : value})
        console.log(details)
        props.parentCallBack(details,1)

    }
    
    return (
        <form className="ride-creation-body" onSubmit={handleSubmit}>
            
            <h1 className="ride-creation-body-header">{props.type=== "drive"? text[0] : text[1]}</h1>
            <input type= "text" className = "ride-creation-input" placeholder="Add a pick-up location"value = {details.start} onChange={e => {setDetails({...details, start : e.target.value})}}/>
            
             <input type= "text" className = "ride-creation-input" placeholder="Enter your destination" value = {details.end} onChange={e => {setDetails({...details, end : e.target.value})}}/>
             
            <DateTimePicker className = "ride-creation-time" value = {value} onChange= {onChange} calendarIcon ={null} disableClock clearIcon={null}/> 
            { props.type === "drive" ?
            <div className="ride-creation-misc">
                
                <input type= "text" className = "ride-creation-model" placeholder="model" value = {details.model} onChange={e => {setDetails({...details, model : e.target.value})}}/> 
                <input type= "text" className = "ride-creation-model"placeholder="seats" value = {details.seats} onChange={e => {setDetails({...details, seats : e.target.value})}}/>
            </div> 
            :
            <div className="rid-creation-misc">
            <input type= "text" className = "ride-creation-model"placeholder="passengers" value = {details.seats} onChange={e => {setDetails({...details, seats : e.target.value})}}/>
            </div>
            }
            <button className = "ride-creation-submit" type = "submit">
                Submit
            </button> 

        </form>
    )
    }

const DisplayComplete = (props) =>{
    const closeWindow = () =>{
        props.parentCallBack(true)
    }
    return(
        <div>
            <h1>Ride Created Successfully</h1>
            <button onClick={closeWindow}>
                Close
            </button>
        </div>
    )
}


export default function RideCreation(props) {

    const handleSubmit = (event) =>{
        event.preventDefault();
        
    }
    const [type, setType] = useState("drive") 
    const [step, setStep] = useState(0)
    const [complete, setComplete] = useState(false)
    let details = {}; 
    const handleCallback = (childData, step) =>{
        details = childData
        console.log("Details" , details)
        setStep(step);
        console.log("now ->",step)
    }
    const handleComplete = (complete) =>{
        setComplete(complete)
        console.log(complete)
        props.parentCallBack(complete)
    }

    return (
        
        
        <div className="form-group" >
            
            <div className = "ride-creation-header">
                <button type ="button"className={type === "drive" ? "ride-header-button-selected" :"ride-header-button"  }onClick = {() => setType("drive")} >
                    <img className = "img" src='assets/steeringWheel.png'/>
                    Drive
                </button>  
                <button type ="button" className={type === "taxi" ? "ride-header-button-selected" :"ride-header-button"  }onClick = {() => setType("taxi")}>
                    <img className = "img" src='assets/rideHailing.png'/>
                    Ride
                </button>
            </div>
            {step === 0 ? <CreateRide type = {type} parentCallBack = {handleCallback}/>   : <DisplayComplete parentCallBack = {handleComplete}/> }
        </div>  
         
        
    );
  
}