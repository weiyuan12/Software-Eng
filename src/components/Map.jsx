import React, { useState, useEffect } from 'react';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


export function DynamicMap(props) {
    // initial center is singapore
    const [marker1,setMarker1] = useState({
        lat:1.352178,
        lng:103.804899
    });
    const [marker2,setMarker2] = useState({
        lat:1.352178,
        lng:103.904899
    });
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
    useEffect(()=>{
        console.log("Changed->", props.start)
        setMarker1(props.start)
        setMarker2(props.end)
    },[props.start, props.end])

    return (
        
        <Map
            google={props.google}
            zoom={11}
            style={mapStyle}
            initialCenter={mapCenter}
            center={mapCenter}
            
        >
            <Marker title = "Location 1" id = {1} position = {marker1}/>
            <Marker title = "Location 2" id = {2} position = {marker2}/>
        </Map>
        
    );
}
  
export default GoogleApiWrapper({
    apiKey: "AIzaSyDYGr_HjF-fweWsSFmtKc2_Jc802Dcb7Fc",
})(DynamicMap)