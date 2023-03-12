import React , {useState} from "react";

import "../styles/SearchRide.css"

export default function Carpark(){
    const [search, setSearch] = useState("")
    const [prevSearch, setPrevSearch] = useState("-")
    const [geoCode,  setGeoCode] = useState({})
    const handleSearch = async(event) =>{
        event.preventDefault();
        setPrevSearch(search)
       
        const geoCode =await getGeoCode(search)
        setGeoCode(geoCode)
        console.log(geoCode)

    }
    //Also validates
    async function getGeoCode (addr){
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
        const geoCode = responseData.result.geocode.location
        
        return geoCode
        }
        catch (err){
            console.log(err)
        }
              
    }
    
    return (
        <div className="search-ride">
            
            <div className="search-ride-header">
                
                <img src ="assets/carparkIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                <h1 className="search-ride-headerText">Carparks availability</h1>
            </div>
            <div className = "search-ride-upper">
                <div className="search-ride-searchbar">
                    <textarea rows={1}placeholder ="Search nearest location" value ={search} onChange={e =>setSearch(e.target.value)} >
                    </textarea>
                    <div className="search-ride-searchIcon">
                        <img src = "assets/searchIcon.png" width="15px" style={{marginTop:"40%"}} onClick ={handleSearch}></img>
                        
                    </div>
                </div>
                <div className="search-ride-result">
                    <h4 >Searched: </h4><h4 style= {{borderBottom : "solid"}}>{prevSearch}</h4>
                </div>
            </div>
            <div className="search-ride-body">
               
            </div>
        
            
        
        </div>
    )
}