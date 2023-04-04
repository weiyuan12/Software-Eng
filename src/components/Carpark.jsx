import React , {useState} from "react";

import "../styles/SearchRide.css"

export default function Carpark(){
    const [search, setSearch] = useState("")
    const [prevSearch, setPrevSearch] = useState("-")
    const [searchResults, setSearchResults] = useState([])
    const [geoCode, setGeoCode] = useState({})
    const OFFSET = 0.0045045
    // const TOKEN = 'fK5t3eccd8-97VDR@QXZE43z033Cc4NJ4-0@d7fR3Jbzf-1wDnyH3K3qE3aYp-4b6s-4DcUAYKp7kGdF7F9-vc8z+MS-833914m-'
    // const ACCESSKEY = '9c313ff0-75da-4cb1-9fca-03f73b67e0c3'
    const handleSearch = async(event) =>{
        event.preventDefault();
        setPrevSearch(search)
        const geoCode = await getGeoCode(search)
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
    console.log(responseData.result)
        if(responseData.result.address.addressComponents[0].confirmationLevel != "CONFIRMED" ){
            alert("Enter a valid location")
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
/*

*/ 
    // async function getSearchResults(input){
    //     const searchVal  = input
    //     let num = 1
    //     let end = true
    //     let results = []
    //     while(end){
    //         let response = await fetch(`https://developers.onemap.sg/commonapi/search?searchVal=${searchVal}&returnGeom=Y&getAddrDetails=Y&pageNum=${num}`)
    //         let data = await response.json()
    //         if (data.found === 0){
    //             alert("Enter a valid location")
    //             end = false
    //         }
    //         data.results.map((a) =>results.push(a) )
            
    //         data.totalNumPages === num ? end = false : num +=1
    //     }
    //     console.log(results)
    //     return results
        
    // }
    // const displaySearchResults = searchResults.map((a) =>{
    //     return(
    //         <div className="search-result-entry" key={searchResults.indexOf(a)}>
    //             <h1>{a.SEARCHVAL}</h1>
    //         </div>
    //     )
    // })
    const handleClick = async() =>{
        console.log("HI")
        const response = await fetch('https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability', {
            headers : {
                AccessKey : ACCESSKEY,
                Token : TOKEN
            },
            mode: "no-cors"
            
        })
        console.log("HII")
        const responseData = await response.json()
        console.log(responseData)
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
                <button onClick= {handleClick}> click</button>
            </div>
        
            
        
        </div>
    )
}