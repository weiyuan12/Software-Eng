import React , {useContext, useEffect, useState} from "react";
import { getGeoCode , convertLatLngToCoords, getCarpark } from "./Helper";
import { CarparkMarkerContext, SelectionContext } from "./Usercontext";
import "../styles/SearchRide.css"

export default function Carpark(){
    const {selection, setSelection} = useContext(SelectionContext)
    const {carparkMarker, setCarparkMarker} = useContext(CarparkMarkerContext)
    const [search, setSearch] = useState("")
    const [prevSearch, setPrevSearch] = useState("-")
    const [allCarparks, setAllCarparks] = useState([])
    const [filteredCarparks,setFilteredCarparks] = useState([])
    const [searchCoords, setSeachCoords] = useState([])
    const XOFFSET = -501.28664295390627
    const YOFFSET = -498.10469814208045
    


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
            if(Xdiff<50000 && Ydiff<50000){
               // console.log([a,totaldiff])
                arr.push([a,totaldiff])
            }
        })
        arr.sort((function(index){
            return function(a, b){
                return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
            };
        })(1));
        console.log(arr)
        arr.length > 5 ? setFilteredCarparks(arr.slice(0,5)) : setFilteredCarparks(arr)
    }, [searchCoords])

    useEffect(() =>{
        console.log("Set CarparkMarker", filteredCarparks)
        setCarparkMarker(filteredCarparks)}
        , [filteredCarparks])

    const displayCarparks = filteredCarparks.map((a) =>[
        <div>
            {a[0].carparkNo}
        </div>
    ])
    return (
        <div className="search-ride">
            
            <div className="search-ride-header">
                
                <img src ="assets/carparkIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                <h1 className="search-ride-headerText">Carparks availability</h1>
                <button onClick={() => {setSelection("")}}>Close</button>
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
                {displayCarparks}
            </div> 
        </div>
    )
}