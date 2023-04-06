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
import MyRides from "./MyRides.jsx"


const handleSelection =  (selection) => {
        
        switch (selection.selection){
            case "Create Ride" :
                return <RideCreation/>
        }
    }

function Main(){
    const {user} = useContext(UserContext);
    const {selection, setSelection} = useContext(SelectionContext);
    const [startMarker, setStartMarker] = useState({
        lat: 1.352178, 
        lng: 103.804899
      })
    const [endMarker, setEndMarker] = useState({
        lat:1.352178,
        lng:103.904899
    })
    console.log(selection); 
    const handleSelection =(complete)=>{
        setSelection(complete)
    }
    const HandleMarker1 =(start) =>{
        console.log(start)
        setStartMarker(start)
    }
    const HandleMarker2 =(end) =>{
        console.log(end)
        setEndMarker(end)
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
            {!user && <Navigate to="/"/>}
        </div>
            {selection==="My Rides" && <MyRides/>}
        <div className="map">
                <DynamicMap  className="map"/> 
            </div>
            
        </div>

    )
}

export default Main;