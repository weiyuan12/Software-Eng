import React, {useState} from "react";
import "../styles/SearchRide.css"

export default function (){

    const [search, setSearch] = useState("")
    const [prevSearch, setPrevSearch] = useState("")
    const handleSearch =(event) =>{
        event.preventDefault();
        setPrevSearch(search)

    }
    const defaultVals = [
        {
            "Driver" : "John",
            "Pick-up Location" : "Bukit Timah2",
            "Destination" : "harbourfront2",
            "Car model" : "mazda 3"
        },
        {
            "Driver" : "John2",
            "Pick-up Location" : "Bukit Timah2sss",
            "Destination" : "harbourfront2",
            "Car model" : "mazda 2"
        }
    ]

    const displayResults = defaultVals.map((a)=>{
        return(
            <div className="search-result-entry">
                <div className="profile-pic">
                    <h1>Insert image</h1>
                </div>
                <div className="search-result-entry-info">
                    <h1>Driver:{a.Driver}</h1>
                    <h1>Pick Up location:{a["Pick-up Location"]}</h1>
                    <h1>Destination:   {a.Destination}</h1>
                    <h1>{a["Car model"]}</h1>
                </div>
                <button className="book-button"> Book Now</button>
            </div>
        )
    }
    )
    
    return(
        <div className="search-ride">
            <div className="search-ride-header">
                
                <img src ="assets/carRideIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                <h1 className="search-ride-headerText">Rides Available</h1>
            </div>
            <div className = "search-ride-upper">
                <div className="search-ride-searchbar">
                    <textarea rows={1}placeholder ="Search pick-up location" value ={search} onChange={e =>setSearch(e.target.value)} >

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
               {displayResults }
            </div>
        
            
        </div>
    )
}