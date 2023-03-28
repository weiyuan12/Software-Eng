import React, {useEffect, useState} from "react";
import { createRoutesFromChildren } from "react-router-dom";
import "../styles/SearchRide.css"

/**
 * Returns a search ride UI that allows user to search for a ride by location
 * @returns SearchRide UI
 */
export default function (){

    const [search, setSearch] = useState("")
    const [prevSearch, setPrevSearch] = useState("-")
    const [re, setRe] = useState(new RegExp("none"))
    const [display, setDisplay] = useState([])
    const [selection , setSelection] = useState({})

    /**
     * sets search result to input
     * @param {*} event user search input
     */
    const handleSearch =(event) =>{
        event.preventDefault();
        setPrevSearch(search)
        

    }
    useEffect(() =>{
        console.log("Changed search = ", prevSearch);
        const re = new RegExp(prevSearch.toLowerCase())
        setRe(re)
        
        let arr = []
        defaultVals.map((a) => {
            if(re.test(a["Pick-up Location"].toLowerCase())){
                arr.push(a)
            }
        })
        setDisplay(arr)

    },[prevSearch])


    const defaultVals = [
        {
            "id " : "1",
            "Driver" : "John",
            "Pick-up Location" : "Bukit Timah2",
            "Destination" : "harbourfront2",
            "Car model" : "mazda 3",
            "type" : "Drive",
            "seats" : 2
        },
        {   
            "id " : "2",
            "Driver" : "John2",
            "Pick-up Location" : "2nd place",
            "Destination" : "harbourfront2",
            "Car model" : "mazda 2",
            "type" : "Drive",
            "seats" : 2
        },
        {   
            "id " : "3",
            "Driver" : "John2",
            "Pick-up Location" : "BUKIT Timah3",
            "Destination" : "harbourfront2",
            "Car model" : "mazda 2",
            "type" : "Taxi",
            "seats" : 2
        },
        {   
            "id " : "4",
            "Driver" : "John2",
            "Pick-up Location" : "BUKIT Timah3",
            "Destination" : "harbourfront2",
            "Car model" : "mazda 2",
            "type" : "Taxi",
            "seats" : 2
        }
    ]
    
    
    const displayResults = display.map((a)=>{
        
        return(
            
            <div className={a.type === "Drive" ? "search-result-entry" : "search-result-entry-2"} key={a["id "]}>
                <div className="profile-pic">
                    <h1>Insert image</h1>
                </div>
                <div className="search-result-entry-info">
                    <div className = "search-title-text">
                        {a.type === "Drive" ? <h1>Drive Offer</h1> : <h1>Taxi Request</h1>}
                    </div>
                    <div className = "text">
                        {a.type === "Drive" ? <h1>Driver: </h1> : <h1>Name: </h1>}
                        <h1>{a.Driver}</h1>
                    </div>
                    <div className = "text">
                        <h1>Pick Up location:</h1>
                        <h1>{a["Pick-up Location"]}</h1></div>
                    <div className = "text">
                        <h1>Destination:</h1>  
                        <h1>{a.Destination}</h1>
                    </div>
                    {a.type === "Drive" ? 
                    <div className = "text">
                        <h1>{a["Car model"]}</h1>
                        <h1 style={{marginLeft:"20px"}}>Seats:</h1>
                        <h1>{a.seats}</h1>
                    </div> :
                    <div className = "text">
                    
                    <h1>Passangers:</h1>
                    <h1>{a.seats}</h1>
                </div> 
                    }
                </div>
                <button className="book-button" onClick={() => {setSelection(a)}}> Book Now</button>
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
               {displayResults}
            </div>  
        </div>
    )
}