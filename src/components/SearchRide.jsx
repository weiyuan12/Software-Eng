import React, {useEffect, useState} from "react";
import { createRoutesFromChildren } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "../styles/SearchRide.css"
import {Link} from "react-router-dom"

/**
 * Returns a search ride UI that allows user to search for a ride by location
 * @returns SearchRide UI
 */
export default function SearchRide (props){
    const [step ,setStep] = useState("Search") //Search, Book, Complete
    const [search, setSearch] = useState("")     //Constantly changing search 
    const [prevSearch, setPrevSearch] = useState("-")   //Sets the search based on the last search when u click on search button
    const [re, setRe] = useState(new RegExp("none"))   //regex used to filter search
    const [display, setDisplay] = useState([])    //Returned array of filtered rides
    const [selection , setSelection] = useState({}) //Selected ride
    const [status, setStatus] = useState("Unconfirmed")   //Unconfirmed, Confirmed

    /**
     * sets search result to input
     * @param {*} event user search input
     */
    const handleSearch =(event) =>{
        event.preventDefault();
        setStep("Search")
        setPrevSearch(search)
    }
    const handleBooking =() =>{
        setStep("Book")
        
    }
    const handleComplete = (complete) =>{
        props.parentCallBack(complete)
        //Pass the selection
        console.log(selection)
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
    const handleCallBack = (step)=>{
        setStep(step)
    }

    
    const DisplayBooking = (props) =>{
        const handleComplete = (action) =>{
            {action === "return" ? props.parentCallBack("Search") : props.parentCallBack("Confirmed")} 
            

        }
        return (
            <div className = "search-ride">
                <div className="search-ride-header">
                    <img src ="assets/bookRideIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                    <h1 className="search-ride-headerText">Book Ride</h1>
                </div>
                <div className="search-ride-body"  >       
                    <div className = "search-title-text" >
                        {selection.type === "Drive" ? <h1>Drive Offer</h1> : <h1>Taxi Request</h1>}
                    </div>
                    <div className="booking-body" style={{display:"flex", flexDirection: "row", justifyContent:"center", marginTop:"20px"}}>
                        <div className="profile-pic">
                            <h1>InsertPic</h1>
                        </div>
                        <div className="search-text" style={{marginBottom:"2em"}}>
                            <div className = "text">
                                {selection.type === "Drive" ? <h1>Driver: </h1> : <h1>Name: </h1>}
                                <h1>{selection.Driver}</h1>
                            </div>
                            <div className = "text">
                                <h1>Pick Up location:</h1>
                                <h1>{selection["Pick-up Location"]}</h1></div>
                            <div className = "text">
                                <h1>Destination:</h1>  
                                <h1>{selection.Destination}</h1>
                            </div>
                            {selection.type === "Drive" ? 
                            <div className = "text">
                                <h1>{selection["Car model"]}</h1>
                                <h1 style={{marginLeft:"20px"}}>Seats:</h1>
                                <h1>{selection.seats}</h1>
                            </div> :
                            <div className = "text">
                            
                                <h1>Passangers:</h1>
                                <h1>{selection.seats}</h1>
                            </div> 
                            }
                        </div>
                    </div>
                    <div className="booking-buttons">
                        <button onClick={()=>handleComplete("return")}>&lt; Go back</button>
                        <button onClick={()=>handleComplete("confirm")}>Confirm Booking &gt;</button>
                        

                    </div>
                </div>
            </div>
        )
    }
    
    
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
                <button className="book-button" onClick={() => {setSelection(a); handleBooking()}}> Book Now</button>
            </div>

        )
    }
    )
    const SearchRide = () =>{
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
    const DisplayComplete = (props) =>{
        const closeWindow = () =>{
            props.parentCallBack("My Rides")
        }
        return(
            <div className = "search-ride">
                <div className="search-ride-header">
                    <img src ="assets/bookRideIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                    <h1 className="search-ride-headerText">Booking Confirmed</h1>
                </div>
                <div className="search-ride-body" style={{border:"solid"}} >
                    Booking Confirmed Successfully       
                </div>
                <button onClick = {closeWindow}>Go to MyRides</button>
            </div>
        
        )

    }

    return(
        <div>
             {step === "Search" ? SearchRide() : step === "Book"? <DisplayBooking parentCallBack = {handleCallBack}/> : <DisplayComplete parentCallBack = {handleComplete}/>} 
            
        </div>
    )
}