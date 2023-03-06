import React, {useContext, useState} from "react";
import Navbar from "./NavGuest.jsx";
import NavMain from "./NavMain";
import DynamicMap from "./Map";
import { UserContext, SelectionContext } from "./Usercontext";
import { Navigate } from "react-router-dom";
import RideCreation from "./RideCreation.jsx";
import "../styles/main.css"
import SearchRide from "./SearchRide.jsx";


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
    
    return(
        <div className="page">
            
            <div className="form">
                {selection==="Create Ride" && <RideCreation parentCallBack = {handleComplete}/>};
                {selection==="Search Ride" && <SearchRide/>};
                {selection==="My Rides" && </* fill in this part*/></>};
                {selection==="Carparks" && </* fill in this part*/></>}
            </div>
            {!user.id && <Navigate to="/"/>}
            <div className="map">
                <DynamicMap  className="map"/> 
            </div>
            
        </div>

    )
}

export default Main;