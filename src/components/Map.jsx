import React, { useState, useEffect } from 'react';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {DirectionsService, DirectionsRenderer} from 'google-maps-react'
import styles from "../styles/main.css"

export function DynamicMap(props) {
    // initial center is singapore
    const [mapCenter, setMapCenter] = useState({
      lat: 1.352178, 
      lng: 103.804899
    });
    const mapStyle = {
        width: "90%", 
        height: "90%",
        marginLeft : "70px",
        marginTop : "10px",
        alignItems : "center",
       
        
    }
    var directionService = new DirectionsService()
    var directionsRenderer = new DirectionsRenderer()
  
    return (
        
        <Map
            google={props.google}
            zoom={11}
            style={mapStyle}
            initialCenter={mapCenter}
            center={mapCenter}
            
        >
            <Marker title = "Location" id = {1} position = {{lat: 1.352178, 
      lng: 103.804899}}/>
        </Map>
        
    );
}
  
export default GoogleApiWrapper({
    apiKey: "AIzaSyDYGr_HjF-fweWsSFmtKc2_Jc802Dcb7Fc",
})(DynamicMap);