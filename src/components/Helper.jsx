import { useContext, useState } from "react"
import { PathContext, UserContext } from "./Usercontext"

export async function getGeoCode (addr){
    if (addr === ""){
        alert("Enter a valid location")
        return null
    }
    try{
    const response = await fetch('https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDYGr_HjF-fweWsSFmtKc2_Jc802Dcb7Fc', 
    {
        method: 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({ 
            "address": 
            {
                "regionCode" : "SG",
                "addressLines": [addr],
    
            }
        })
    })
    const responseData = await response.json()
    console.log(responseData.result)
        if(responseData.result.address.addressComponents[0].confirmationLevel != "CONFIRMED" ){
            console.log(responseData.result.address.addressComponents[0])
            alert("Enter a valid location")
            return null;
        }
        else{
            const geoCode = responseData.result.geocode.location
            return geoCode
        }
    }
    catch (err){
        console.log(err)
    }

}

export async function convertLatLngToCoords (lat, lng){
    const response = await fetch(`https://developers.onemap.sg/commonapi/convert/4326to3414?latitude=${lat}&longitude=${lng}`)
    return response.json()
}


export async function getCarpark(){
    const response = await fetch("http://127.0.0.1:8000/api/carpark/")
        .then(res => res.json())
    const data = response.data.Result
    return data
}
export async function convertCoordsToLatLng(carpark){
    const geom = carpark[0].geometries[0].coordinates.toString()
    const geomArr = geom.split(",")
    const X = geomArr[0]
    const Y = geomArr[1]

    const response = await fetch(`https://developers.onemap.sg/commonapi/convert/3414to4326?X=${X}&Y=${Y}`).then(res => res.json())
   
    return {lat:response.latitude, lng: response.longitude}
    
}

export async function calculateRoute(origin, destination) {
    let path = []
    const directionsService = new google.maps.DirectionsService()
    
    const results = await directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        }
    )
        if(!path[0]){
            for (var i=0; i<results.routes[0].overview_path.length;i++) {
                let tempCoords = {lat: results.routes[0].overview_path[i].lat(), lng: results.routes[0].overview_path[i].lng()}
                path.push(tempCoords)
                
            }
        }
    console.log(path)
    
    return path

}
export async function sendData (data, user) {
   
    console.log(data)
   
        fetch("http://127.0.0.1:8000/core/rides/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ user.token},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response =>console.log(response))
        .catch(error => console.error(error));
}

export async function getTaxi(){
    const response = await fetch("http://127.0.0.1:8000/api/taxi/")
        .then(res => res.json())
    const data = response.data.features
    return data
}

export async function getRides(user){
    const response = await fetch("http://127.0.0.1:8000/core/rides/",{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ user.token
        },
    })
        .then(res => res.json())
    const data = response.data
   
    return data
}

export async function requestRide(user, data){
    const response = await fetch("http://127.0.0.1:8000/core/riderequest/",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ user.token
        },
        body:JSON.stringify(data)
     
    })
    .then(res => res.json())
    console.log(response)
    return response
}
export async function getUserProfile(user){
    const response = await fetch("http://127.0.0.1:8000/core/userprofile/",{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ user.token
        },
    })
        .then(res => res.json())
    return response
}
export async function getAllUserProfile(user){
    const response = await fetch("http://127.0.0.1:8000/core/alluserprofiles/",{
        method: "GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ user.token
        },
    })
        .then(res => res.json())
    return response
}


