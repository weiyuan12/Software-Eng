import React, { useState, useEffect, useContext } from 'react';

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Marker1Context, Marker2Context, CarparkMarkerContext } from './Usercontext';
import { convertCoordsToLatLng } from './Helper';
import "../styles/map.css"

export function DynamicMap(props) {
    // initial center is singapore
    const [display, setDisplay] = useState("All")
    const [showInfo, setShowInfo] = useState(false)
    const [active, setActive] = useState({})
    const {marker1, setMarker1} = useContext(Marker1Context);
    const {marker2, setMarker2} = useContext(Marker2Context);
    const {carparkMarker, setCarparkMarker} = useContext(CarparkMarkerContext)
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
            console.log("coord->", marker[0].geometries[0].coordinates, " Pos->", pos)
            return pos
        })
        Promise.all(arr).then(values => setCoords(values))
        
    },[carparkMarker])

    
    const displayAllCarparks = coords.map((coord)=>{
        if(carparkMarker.length !== 0){
            return(
                <Marker title = "Carpark" 
                id = {coords.indexOf(coord)} 
                key = {"B" + coords.indexOf(coord)} 
                position = {coord}
                onClick={(e)=>{handleMarkerClick(e)}}
                data = {carparkMarker[coords.indexOf(coord)][0]}
                />
                
                )
        }
    }
    )
    

    const handleMarkerClick =(e) =>{
        setActive(e)
        setShowInfo(!showInfo)
        console.log(e)
        

    }
    // const displayAllCarparkInfo = coords.map((coord)=>{
    //         if (carparkMarker.length !== 0) {
    //             return(
    //                 <InfoWindow title = "Info" id = {"A" + coords.indexOf(coord)} key = {coords.indexOf(coord)} position = {coord} visible={true}>
    //                     <div >
    //                         <img src='assets/parkingLogo.png' style={{width:"20px"}}/>
    //                         <div>
    //                             <h4>{carparkMarker[coords.indexOf(coord)][0].carparkNo}</h4>
    //                         </div>
    //                     </div>
    //                 </InfoWindow>
    //             )
    //         }
    //     })
    const displayMarkerInfo = () =>{
        console.log("Display Marker Info")
        console.log(active)
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
           
            
            
            
        </Map>
    );
}   

export default GoogleApiWrapper({
    apiKey: "AIzaSyDYGr_HjF-fweWsSFmtKc2_Jc802Dcb7Fc",
})(DynamicMap)