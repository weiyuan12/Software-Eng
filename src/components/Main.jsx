import React, {useContext, useState} from "react";
import Navbar from "./NavGuest.jsx";
import NavMain from "./NavMain";
import DynamicMap from "./Map";
import { UserContext, SelectionContext } from "./Usercontext";
import { Navigate } from "react-router-dom";
import RideCreation from "./RideCreation.jsx";
import "../styles/main.css"


const handleSelection =  (selection) => {
        
        switch (selection.selection){
            case "Create Ride" :
                return <RideCreation/>
        }
    }

function Main( selection ){
    const {user} = useContext(UserContext);
    console.log(selection)
    
    return(
        <div className="page">
            <div className="form">
            {handleSelection(selection)}
            </div>
            {!user.id && <Navigate to="/"/>}
            <div className="map">
                {/* <DynamicMap  className="map"/> */}
            </div>
            
        </div>

    )
}

export default Main;