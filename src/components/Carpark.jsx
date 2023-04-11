import React , {useContext, useEffect, useState} from "react";
import { getGeoCode , convertLatLngToCoords, getCarpark} from "./Helper";
import { CarparkMarkerContext, SelectionContext } from "./Usercontext";
import "../styles/SearchRide.css"

export default function Carpark(){
    const [filter, setFilter] = useState("Lots")
    const {selection, setSelection} = useContext(SelectionContext)
    const {carparkMarker, setCarparkMarker} = useContext(CarparkMarkerContext)
    const [search, setSearch] = useState("")
    const [prevSearch, setPrevSearch] = useState("-")
    const [allCarparks, setAllCarparks] = useState([])
    const [filteredCarparks,setFilteredCarparks] = useState([])
    const [searchCoords, setSeachCoords] = useState([])
    
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
    const handleSearch = async(event) =>{
        
        event.preventDefault();
        setPrevSearch(search)
        const carparks = await getCarpark()
        setAllCarparks(carparks)
        const geoCode = await getGeoCode(search)
        console.log("fetched geocode->", geoCode)
        const coords = await convertLatLngToCoords(geoCode.latitude, geoCode.longitude)
        console.log("Fetched coods", coords)
        setSeachCoords([coords.X,coords.Y])
        lots.style.backgroundColor =  "rgb(94, 184, 94)"
        show.style.backgroundColor = "#A8B5E0"
        dist.style.backgroundColor =  "#A8B5E0"
        //const response = await fetch('https://developers.onemap.sg/commonapi/convert/4326to3414?latitude=1.319728905&longitude=103.8421581', {
        // console.log(responseData)
       
    }
    
    useEffect(()=>{
        console.log("In useEffect")
        let arr = []
        allCarparks.map((a) =>{
            
            const geom = a.geometries[0].coordinates.toString()
            const geomArr = geom.split(",")
            const Xdiff = Math.abs(+geomArr[0] - searchCoords[0])
            const Ydiff = Math.abs(+geomArr[1] - searchCoords[1])
            const totaldiff = Xdiff + Ydiff
            if(Xdiff<5000 && Ydiff<5000){
               // console.log([a,totaldiff])
                arr.push([a,totaldiff])
            }
        })
        console.log("carpark arr",arr)
        console.log(filter)
        filter === "Distance" ? 
        arr.sort((function(index){
            return function(a, b){
                return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
            };
        })(1)): 
        arr.sort((function(index){
            return function(a, b){
                
                return (+a[index].lotsAvailable === +b[index].lotsAvailable ? 0 : (+a[index].lotsAvailable > +b[index].lotsAvailable ? -1 : 1));
            };
        })(0));
        arr.length > 5? setFilteredCarparks(arr.slice(0,5)) : setFilteredCarparks(arr)
        console.log("Set CarparkMarker", filteredCarparks)
        setCarparkMarker([])
    }   
        , [searchCoords, filter])

    const displayCarparks = filteredCarparks.map((a) =>[
        <div className="search-result-entry" style={{height:"20%", alignItems:"center"}} key = {filteredCarparks.indexOf(a)}>
            <img src="assets/parkingLogo.png" width={"15%"} height={"80%"}></img>
            <div style={{margin:"10px"}}>
                {a[0].carparkNo}
            </div>
            <div>
                Carpark lots available:
               {a[0].lotsAvailable} 
            </div>
        </div>
    ])
    const show = document.getElementById("show")
    console.log(show)
    const lots = document.getElementById("lots")
    const dist = document.getElementById("dist")
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
            <div className="CarparkButtons">
                <button id="show"className="btn2"onClick={() =>{
                    setCarparkMarker(filteredCarparks)
                    show.style.backgroundColor =  "rgb(94, 184, 94)"
                }}>
                    Show all on map
                </button>
                <button id="lots"className="btn2"onClick={()=>{
                    setFilter("Lots")
                    show.style.backgroundColor = "#A8B5E0"
                    lots.style.backgroundColor =  "rgb(94, 184, 94)"
                    dist.style.backgroundColor =  "#A8B5E0"
                    }}>
                    Filter by lots available
                </button>
                <button id="dist"className="btn2"onClick={()=>{
                    setFilter("Distance")
                    dist.style.backgroundColor =  "rgb(94, 184, 94)"
                    lots.style.backgroundColor =  "#A8B5E0"
                    show.style.backgroundColor = "#A8B5E0"
                    }}>
                    Filter by distance
                </button>
            </div>
            <div className="search-ride-body">
                {displayCarparks}
            </div> 
        </div>
    )
}