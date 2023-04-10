import React, { useState, useEffect, useContext } from 'react';

import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from 'google-maps-react';
import { Marker1Context, Marker2Context, CarparkMarkerContext, PathContext, TaxiContext, LocationContext } from './Usercontext';
import { convertCoordsToLatLng } from './Helper';
import "../styles/map.css";
var parkingIcon = {
    url: "assets/placeholder.png" ,
    scaledSize: {width:40, height:40}
  };
var parkingIcon = {
    url: "assets/taxi.png" ,
    scaledSize: {width:40, height:40}
  };
  var personIcon = {
    url: "assets/person.png" ,
    scaledSize: {width:50, height:50}
  };
export function DynamicMap(props) {
    // initial center is singapore
    const {path, setPath} = useContext(PathContext)
    const [active, setActive] = useState({})
    const {marker1, setMarker1} = useContext(Marker1Context);
    const {marker2, setMarker2} = useContext(Marker2Context);
    const {carparkMarker, setCarparkMarker} = useContext(CarparkMarkerContext)
    const {taxis, setTaxis} = useContext(TaxiContext)
    const {location, setLocation} = useContext(LocationContext)
    const [coords, setCoords] = useState([])
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
    const infoStyle ={
        width:"80px"
    }

    
    useEffect(()=>{
        console.log(carparkMarker)
        const arr =  carparkMarker.map(async(marker) =>{
            const pos =  await convertCoordsToLatLng(marker)
            return pos
        })
        Promise.all(arr).then(values => setCoords(values))
        
    },[carparkMarker])

    
    const displayAllCarparks = coords.map((coord)=>{
        if(carparkMarker.length !== 0){
            return(
                <Marker title = "Carpark" 
                id = {"C" +coords.indexOf(coord)} 
                key = {"C" + coords.indexOf(coord)} 
                position = {coord}
                icon = {parkingIcon}
                onClick={(e)=>{handleMarkerClick(e)}}
                data = {carparkMarker[coords.indexOf(coord)][0]}
                />
            )
        }
    })
    const displayTaxis = taxis.map((coord)=>{
        if(taxis.length !== 0){
            return(
                <Marker title = "Taxi" 
                id = {"T" + taxis.indexOf(coord)} 
                key = {"T" + taxis.indexOf(coord)} 
                position = {{lat:coord[0][1], lng: coord[0][0]}}
                icon = {parkingIcon}
                />     
            )
        }
    })
    const displayPerson = () =>{
        
        if (location.length !== 0){
            console.log("Hello")
            return (
                <Marker
                title ="Person"
                position = {{lat: location.latitude, lng: location.longitude}}
                icon ={personIcon}
                />
            )
        }
    }
    
    const handleMarkerClick =(e) =>{
        setActive(e)
    }

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
            <InfoWindow
                marker = {active}
                visible = {true}
                position = {active.position}
            >
                {active.data !== undefined ? 
                <div className='infowindow'>
                    <div>
                        <strong>
                        {active.data.carparkNo}
                        </strong>
                    </div>
                        
                    <div style={{display : "flex" , flexDirection : "row"}}>
                        <h4>Lots: </h4>
                        
                        {active.data.lotsAvailable}
                        
                    </div>
                </div> 
                : <></>
                }
            </InfoWindow>
            {displayAllCarparks}
            {displayTaxis}
            {displayPerson()}
            <Polyline
                path={path}
                strokeColor="#FF0000"
                strokeOpacity={0.8}
                strokeWeight={2} />
            
        </Map>
    );
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyDYGr_HjF-fweWsSFmtKc2_Jc802Dcb7Fc",
})(DynamicMap)