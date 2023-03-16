import React, {useContext, useState} from "react";
import Navbar from "./NavGuest.jsx";
import NavMain from "./NavMain";
import DynamicMap from "./Map";
import { UserContext, SelectionContext } from "./Usercontext";
import { Navigate } from "react-router-dom";
import MyRides from "./MyRides.jsx";

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
        <div style={{width:'100%',height:'100%'}}>
            {!user.id && <Navigate to="/"/>}
            {/* {selection==="Create Ride" && <RideCreation/>} */}
            {/* {selection==="Search Ride" && <SearchRide/>} */}
            {selection==="My Rides" && <MyRides/>}
            {selection==="Carparks" && </* fill in this part*/></>}
            <div>
                {selection!=="My Rides" && <DynamicMap />}
            </div>
                
            
        </div>
    )
}

export default Main;