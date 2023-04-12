import React , {useContext, useEffect, useState} from "react";
import { getGeoCode, getTaxi} from "./Helper";
import { CarparkMarkerContext, LocationContext, SelectionContext, TaxiContext } from "./Usercontext";
import "../styles/SearchRide.css"

export default function Taxi(){
    const [search, setSearch] = useState("")
    const [geoCode, setGeoCode]= useState({})
    const [allTaxi, setAllTaxi]= useState([])
    const [filteredTaxi, setFilteredTaxi] = useState([])
    const [prevSearch, setPrevSearch] = useState("-")
    const {taxis, setTaxis} = useContext(TaxiContext)
    const {location, setLocation} = useContext(LocationContext)
    const handleSearch = async(event) =>{
        event.preventDefault();
        setPrevSearch(search)
        const geoLocation = await getGeoCode(search)
        setGeoCode(geoLocation)
        const taxi = await getTaxi()
        setAllTaxi(taxi[0].geometry.coordinates)
    }
    useEffect(()=>{
        let arr = []
        console.log(geoCode)
        allTaxi.map((a)=>{
            const geom = a.toString()
            const geomArr = geom.split(",")
            const Xdiff = Math.abs(+geomArr[0] - geoCode.longitude)
            const Ydiff = Math.abs(+geomArr[1] - geoCode.latitude)
            const totaldiff = Xdiff + Ydiff
            if(totaldiff<0.02){
               // console.log([a,totaldiff])
                arr.push([a,totaldiff])
            }
        })
        arr.sort((function(index){
            return function(a, b){
                return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
            };
        })(1))
        arr.length > 10? setFilteredTaxi(arr.slice(0,10)) : setFilteredTaxi(arr)
    }, [allTaxi])
    useEffect(()=>{
        if(filteredTaxi.length > 0){
            const el = document.getElementById("taxi-btn")
            el.style.visibility = 'visible'
        }

    },[filteredTaxi])
    return(
        <div className="search-ride" style={{height:"200px"}}>
            <div className="search-ride-header">
                <img src ="assets/bookRideIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                <h1 className="search-ride-headerText">Find Taxi</h1>
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
            <div>
                <button id="taxi-btn" style={{visibility:"hidden",backgroundColor: "#A8B5E0", width:"150px",height:"30px",borderRadius:"5px"}}onClick={()=>{setTaxis(filteredTaxi) , setLocation(geoCode)}}>Show Taxis Nearby</button>
            </div> 
        </div>
    )


    
}