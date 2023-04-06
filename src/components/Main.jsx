import React, {useContext, useState} from "react";
import Navbar from "./NavGuest.jsx";
import NavMain from "./NavMain";
import DynamicMap from "./Map";
import { UserContext, SelectionContext } from "./Usercontext";
import { Navigate } from "react-router-dom";
import RideCreation from "./RideCreation.jsx";
import "../styles/main.css"
import SearchRide from "./SearchRide.jsx";
import Carpark from "./Carpark.jsx";


const handleSelection =  (selection) => {
        
        switch (selection.selection){
            case "Create Ride" :
                return <RideCreation/>
        }
    }

function Main(){
    const {user} = useContext(UserContext);
    const {selection, setSelection} = useContext(SelectionContext);
    
    console.log(selection); 
    const handleComplete =(complete)=>{
        if(complete){
            setSelection("")
        }
    }
    // can juz use usecontext for this
    
    return(
        <div>
        <div className="page">
            <div className="form">
                {selection==="Create Ride" && <RideCreation parentCallBack = {handleSelection} marker1CallBack = {HandleMarker1} marker2CallBack = {HandleMarker2}/>}
                {selection==="Search Ride" && <SearchRide parentCallBack = {handleSelection}/>} 
                {selection==="Carparks" && <Carpark/>}
            </div>
            {!user.id && <Navigate to="/"/>}
        </div>
            {selection==="My Rides" && <MyRides/>}
        <div className="map">
            {selection!=="My Rides" && <DynamicMap  className="map" start = {startMarker} end = {endMarker}/>}
        </div>
        </div>

    )
}

export default Main;