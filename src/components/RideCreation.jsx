import React, { useEffect, useState, useContext } from "react";
import "../styles/RideCreation.css"
import DateTimePicker from "react-datetime-picker";
import { getGeoCode } from "./Helper";
import { Marker1Context } from "./Usercontext";
import { Marker } from "google-maps-react";
import { Marker2Context } from "./Usercontext";


/**
 * Rerturns the CreateRideUI that allows Users to select "Drive" or "Taxi"
 * @param {parentCallBack} props complete
 * @returns the CreateRideUI
 */


export default function RideCreation(props) {

    const handleSubmit = (event) =>{
        event.preventDefault();
        
    }

    const [type, setType] = useState("Personal Car") 
    const [step, setStep] = useState(0)
    const [complete, setComplete] = useState(false)
    let details = {}; 
    const handleCallback = (childData, step) =>{
        details = childData
        setStep(step);
        console.log("now ->",step)
        console.log(details)
    }
    const handleComplete = (complete) =>{
        setComplete(complete)
        console.log(complete)
        props.parentCallBack(complete)
    }

    return (
        
        
        <div className="form-group" >
            
            <div className = "ride-creation-header">
                <button type ="button"className={type === "Personal Car" ? "ride-header-button-selected" :"ride-header-button"  }onClick = {() => setType("Personal Car")} >
                    <img className = "img" src='assets/steeringWheel.png'/>
                    <h1 className="ride-header-button-text">Drive</h1>
                </button>  
                <button type ="button" className={type === "Taxi" ? "ride-header-button-selected" :"ride-header-button"  }onClick = {() => setType("Taxi")}>
                    <img className = "img" src='assets/rideHailing.png'/>
                    <h1 className="ride-header-button-text">Taxi</h1>
                </button>
            </div>
            {step === 0 ? <CreateRide type = {type} parentCallBack = {handleCallback}/>   : <DisplayComplete parentCallBack = {handleComplete}/> }
        </div> 
        
         
        
    );
  
}
/**
 *  displays a form requiring the user to input the necessary details based on props.type
 * @param {type} props
 * @returns ride details input form
 */
const CreateRide = (props) =>{
    const {marker1, setMarker1} = useContext(Marker1Context)
    const {marker2, setMarker2} = useContext(Marker2Context)
    
    const [verify1, setVerify1] = useState(false)
    const [verify2, setVerify2] = useState(false)
    const [value, onChange] = useState(new Date())
    const [details, setDetails] = useState({
        start : "",
        end : "",
        time : new Date(),
        seats : 0,
        recurring : false,
        type : "",
        startlatlng : {},
        endlatlng:{}
    })
    useEffect(() => {
        setDetails({...details, type : props.type});
      }, [props.type]);

    const text = ["Enter your drive details","Enter your ride details"]
    
    const handleSubmit = async (event)=>{  
        event.preventDefault();
        if (verify1 && verify2){
            setDetails({...details, time : value})
            console.log(details.time.toDateString)
            console.log(typeof details.seats)
            props.parentCallBack(details,1)
        }
        else if (!verify1){
            alert("Please Verify Start location")
        }
        else if (!verify2){
            alert("Please Verify End location")
        }

    }
    const handleClick = ( bool) =>{
        event.preventDefault();
        setDetails({...details, recurring : bool})
        bool ? document.getElementById("but-1").classList.add("selected") : document.getElementById("but-1").classList.remove("selected")
        !bool ? document.getElementById("but-2").classList.add("selected") : document.getElementById("but-2").classList.remove("selected")
        
    }
    const handleVerify = async (event, field,props)=>{
        event.preventDefault()
        const location = document.getElementById(field).value
        let geoLocation = await getGeoCode(location)
        geoLocation = {lat: geoLocation.latitude, lng:geoLocation.longitude}
        if (geoLocation !== null){
            console.log("accepted")
            field === "start"? 
                (
                    setVerify1(true),
                    setDetails({...details, startlatlng:geoLocation}),
                    setMarker1(geoLocation),
                    console.log("Marker 1 set at->", geoLocation)
            
                ) : 
                (
                    setVerify2(true),
                    setDetails({...details, endlatlng:geoLocation}),
                    setMarker2(geoLocation),
                    console.log("Marker 2 set at->", geoLocation)
                )
        }
        else{
            field === "start"? setVerify1(false) : setVerify2(false)
            document.getElementById(field).value = ""
        }
    }
    
    return (
        <form className="ride-creation-body" onSubmit={handleSubmit}>
            
            <h1 className="ride-creation-body-header">{props.type=== "Personal Car"? text[0] : text[1]}</h1>
            <div className="input-field">
                <input type= "text" id = "start" className = "ride-creation-input" placeholder="Add a pick-up location"value = {details.start} onChange={e => {setDetails({...details, start : e.target.value}) ,setVerify1(false)}} required/>
                {!verify1? <button onClick= {(e)=>handleVerify(e,"start",props)}>Verify</button> : <img src="assets/verified.png" width={"30px"} style={{marginleft:"10px"}}/>}
            </div>
            <div className="input-field">
                <input type= "text" id = "end" className = "ride-creation-input" placeholder="Enter your destination" value = {details.end} onChange={e => {setDetails({...details, end : e.target.value}) ,setVerify2(false)}} required/>
               { !verify2? <button onClick= {(e)=>handleVerify(e,"end",props)}>Verify</button> : <img src="assets/verified.png" width={"30px"} style={{marginleft:"5px"}}/>}
            </div>
            <DateTimePicker className = "ride-creation-time" value = {value} onChange= {onChange} calendarIcon ={null} disableClock clearIcon={null} required/> 
            { props.type === "Personal Car" ?
            <div className="ride-creation-misc">
                
                <div className="button-array">
                    <button id = "but-1" className = "selected" onClick={(e) => handleClick(true)}>Recurring</button>
                    <button id = "but-2"onClick={(e) => handleClick(false)}>One-Time</button>
                    
                </div>
                <input type= "number" className = "ride-creation-model"placeholder="seats" value = {details.seats} onChange={e => {setDetails({...details, seats : e.target.value})}} required/>
            </div> 
            :
            <div className="rid-creation-misc">
            <input type= "text" className = "ride-creation-model"placeholder="passengers" value = {details.seats} onChange={e => {setDetails({...details, seats : e.target.value})}} required/>
            </div>
            }
            <button className = "ride-creation-submit"type="submit">
                Submit
            </button> 

        </form>
    )
    }


const DisplayComplete = (props) =>{
    const closeWindow = () =>{
        props.parentCallBack("")
        
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


