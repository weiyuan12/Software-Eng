import React, {useContext, useEffect, useState} from "react";
import Navbar from "./NavGuest.jsx";
import NavMain from "./NavMain";
import DynamicMap from "./Map";
import { UserContext, SelectionContext, Marker1Context, Marker2Context, CarparkMarkerContext, PathContext, TaxiContext, LocationContext} from "./Usercontext";
import { Navigate } from "react-router-dom";
import RideCreation from "./RideCreation.jsx";
import "../styles/main.css"
import SearchRide from "./SearchRide.jsx";
import Carpark from "./Carpark.jsx";
import MyRides from "./MyRides.jsx";
import Taxi from "./Taxi.jsx";


const handleSelection =  (selection) => {
        switch (selection.selection){
            case "Create Ride" :
                return <RideCreation/>
        }
    }

function Main(){
    
    const {user} = useContext(UserContext);
    const {selection, setSelection} = useContext(SelectionContext);
    const {marker1, setMarker1} = useContext(Marker1Context);
    const {marker2, setMarker2} = useContext(Marker2Context);
    const {carparkMarker, setCarparkMarker} = useContext(CarparkMarkerContext)
    const {path, setPath} = useContext(PathContext)
    const {taxis, setTaxis} = useContext(TaxiContext)
    const {location, setLocation} = useContext(LocationContext)
    console.log(selection); 
    const handleSelection =(complete)=>{
        setSelection(complete)
    }
    useEffect(()=>{setMarker1({}) , setMarker2({}), setCarparkMarker([]), setPath([]) ,setTaxis([]), setLocation([]),console.log("Markers cleared")},[selection])


    return(
        <div>
        <div className="page">
            <div className="form">
                {selection==="Create Ride" && <RideCreation parentCallBack = {handleSelection}/>}
                {selection==="Search Ride" && <SearchRide parentCallBack = {handleSelection}/>}
                {selection==="Carparks" && <Carpark/>}
                {selection==="Taxi" && <Taxi/>}
            </div>
            {!user && <Navigate to="/"/>}
        </div>
            {selection==="My Rides" && <MyRides/>}
            {selection!=='My Rides' &&
            <div className="map">
                <DynamicMap  className="map"/> 
            </div>
            }
            
        </div>

    )
}

export default Main;