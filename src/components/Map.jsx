import React, { useState, useEffect, useContext } from 'react';

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Marker1Context, Marker2Context, CarparkMarkerContext } from './Usercontext';
import { convertCoordsToLatLng } from './Helper';
import styles from "../styles/main.css"

export function DynamicMap(props) {
    // initial center is singapore
    const [display, setDisplay] = useState("All")
    const {marker1, setMarker1} = useContext(Marker1Context);
    const {marker2, setMarker2} = useContext(Marker2Context);
    const {carparkMarker, setCarparkMarker} = useContext(CarparkMarkerContext)
    const [coords, setCoords] = useState([])
    const [mapCenter, setMapCenter] = useState({
      lat: 1.352178, 
      lng: 103.804899
    });
    const [a, seta] = useState([{lat: 1.352178, 
        lng: 103.804899}, {lat: 1.362178, 
            lng: 103.804899}])
    const mapStyle = {
        width: "90%", 
        height: "90%",
        marginLeft : "70px",
        marginTop : "10px",
        alignItems : "center",     
    }
    const infoStyle ={
        width:"80px"
    }


    useEffect(()=>{
        console.log(carparkMarker)
        console.log(setCarpark())
        
    },[carparkMarker])
    const setCarpark =  () =>{
        const arr =  carparkMarker.map(async(marker) =>{
            const pos =  await convertCoordsToLatLng(marker)
            console.log("coord->", marker[0].geometries[0].coordinates, " Pos->", pos)
            return pos
        })
        Promise.all(arr).then(values => setCoords(values))
    }

    useEffect(()=>{
        console.log(coords)
        
    },[coords])

    const displayAllCarparks = coords.map((coord)=>{
            console.log(coord)
            return(
                <Marker title = "Carpark" id = {"M"+ coords.indexOf(coord)} key = {coords.indexOf(coord)} position = {coord}/>
            )
        })
    
    const displayAllCarparkInfo = coords.map((coord)=>{
            console.log(coord)
            return(
                <InfoWindow key = {coords.indexOf(coord)} position = {coord} visible={true}>
                <div >
                    <img src='assets/parkingLogo.png' style={{width:"20px"}}/>
                    <h4>
                        Carpark
                    </h4>
                </div>
                </InfoWindow>
            )
        })


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
            {/* {displayAllCarparks} */}
            {displayAllCarparkInfo}
            {/* {coords.map((coord)=>{
                console.log(coord)
                return(
                    <InfoWindow
                    style={infoStyle}
                    position = {coord}
                    id = {coords.indexOf(coord)}
                    key = {coords.indexOf(coord)} 
                    visible={true}>
                        <div >
                            <img src='assets/parkingLogo.png' style={{width:"10px"}}/>
                            
                            <h4>
                                Hello
                            </h4>
                        </div>
                        {console.log("HIIII")}
                    </InfoWindow>
                )
            })} */}
        </Map>
    );
}   

export default GoogleApiWrapper({
    apiKey: "AIzaSyDYGr_HjF-fweWsSFmtKc2_Jc802Dcb7Fc",
})(DynamicMap)